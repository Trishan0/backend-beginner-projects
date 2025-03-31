from flask import request, Flask, jsonify

api = Flask(__name__)

@api.route('/weather', methods=['GET'])
def getweather():
    weather_data = {
        "location": "Colombo",
        "temperature": "30°C",
        "condition": "Sunny",
        "humidity": "70%"
    }
    return jsonify(weather_data)

if __name__ == '__main__':
    api.run(debug=True, port=5000)