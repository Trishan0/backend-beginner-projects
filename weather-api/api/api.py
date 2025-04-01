from flask import request, Flask, jsonify
from dotenv import load_dotenv
import requests
import os

load_dotenv()
api = Flask(__name__)
API_KEY = os.getenv('API_KEY')


def get_weather(location):
    url = f'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/{location}?unitGroup=us&include=days&key={API_KEY}&contentType=json'
    response = requests.get(url)

    if response.status_code == 200:
        return response.json()
    else:
        return None


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
    api.run(debug=True, port=5000)
