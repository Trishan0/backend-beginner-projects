from flask import request, Flask, jsonify
from dotenv import load_dotenv
import requests
import os
import redis
import json

load_dotenv()
api = Flask(__name__)

API_KEY = os.getenv('API_KEY')
REDIS_HOST = os.getenv('REDIS_HOST','localhost')
REDIS_PORT = os.getenv('REDIS_PORT',6379)

# Initialize Redis
redis_client = redis.Redis(host=REDIS_HOST, port=REDIS_PORT, decode_responses=True)


def get_weather(location):
    # Check if data is already cached
    cached_data = redis_client.get(location)

    if cached_data:
        return json.loads(cached_data)

    # If not cached, fetch from API
    url = f'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/{location}?unitGroup=us&include=days&key={API_KEY}&contentType=json'

    try:
        response = requests.get(url,timeout=5)
        response.raise_for_status()

        data = response.json()

        if 'errorCode' in data:
            return {"error": "Invalid location or API issue", "details": data.get("message", "Unknown error")}

        redis_client.setex(location, 3600, json.dumps(data))
        return data
    except requests.exceptions.Timeout:
        return {"error": "Weather API timeout. Try again later."}
    except requests.exceptions.HTTPError as err:
        return {"error": f"Weather API error: {err.response.status_code}"}
    except requests.exceptions.RequestException as e:
        return {"error": "Failed to fetch weather data", "details": str(e)}


@api.route('/weather', methods=['GET'])
def weather():
    location = request.args.get('location')

    if not location:
        return jsonify({"error": "location parameter is required"}), 400

    weather_data = get_weather(location)

    if weather_data:
        return jsonify({"data": weather_data})

    return jsonify({"error": "Failed to fetch weather data"}), 500


if __name__ == '__main__':
    api.run(debug=True, port=5001)
