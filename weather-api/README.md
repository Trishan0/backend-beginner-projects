# Weather API with Flask, Redis, and Flask-Limiter

This project is a Flask-based web application that fetches weather data for a given location from the Visual Crossing Weather API. The application implements caching using Redis and rate limiting using Flask-Limiter.

## Features

- **Weather Data Fetching**: Retrieves weather data for a specified location using the Visual Crossing Weather API.
- **Caching with Redis**: Caches the weather data in Redis to reduce API calls and improve performance.
- **Rate Limiting with Flask-Limiter**: Limits the number of API requests a user can make to prevent abuse.

## Requirements

- Python 3.x
- Flask
- Redis (Cloud or local instance)
- Visual Crossing Weather API Key - [Get your API KEY](https://www.visualcrossing.com/)


### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/Trishan0/backend-beginner-projects.git
    cd backend-beginner-projects/weather-api
    ```

2. Create a virtual environment:
    ```sh
    python -m venv venv
    ```

3. Activate the virtual environment:
    - On Windows:
        ```sh
        venv\Scripts\activate
        ```
    - On macOS/Linux:
        ```sh
        source venv/bin/activate
        ```
4. Install external libraries:
   ```bash
   pip install -r requirements.txt 
   ```
### Usage

Edit the .env file:
```sh
API_KEY =your_api_key_here
REDIS_HOST=your_redis_host_here
REDIS_PORT=your_redis_port_here
```

Run the file:
```sh
cd api
python api.py
```


Solution to the roadmap.sh project [Weather API](https://roadmap.sh/projects/weather-api-wrapper-service)
