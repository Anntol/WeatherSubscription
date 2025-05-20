# Weather Subscription API

This project is a NestJS-based backend application that provides endpoints for weather subscription management, confirmation, and weather data retrieval.

## Features

- Subscribe to weather updates for a city (hourly or daily)
- Email confirmation and unsubscribe functionality
- Fetch current weather data for a city
- PostgreSQL database integration
- Follows the [OpenAPI spec](https://github.com/mykhailo-hrynko/se-school-5/blob/c05946703852b277e9d6dcb63ffd06fd1e06da5f/swagger.yaml)

## Running Locally with Docker

### Prerequisites

- [Docker](https://www.docker.com/get-started) installed

### Steps

1. **Clone this repository**  
   ```sh
   git clone <your-repo-url>
   cd WeatherSubscription
   ```

2. **Configure environment variables**  
   Copy example files and adjust as needed:
   ```sh
   cp weather-subscription/.env.example weather-subscription/.env
   cp weather-subscription/docker.env.example weather-subscription/docker.env
   ```
   Edit `weather-subscription/.env` and `weather-subscription/docker.env` to set your API keys, SMTP credentials, and database settings.

3. **Start the application stack**  
   ```sh
   cd weather-subscription
   docker-compose up --build
   ```
   This will start:
   - The NestJS API server (on port 3000)
   - PostgreSQL database (on port 5432)
   - pgAdmin (on port 8080)

4. **Access the API**  
   The API will be available at [http://localhost:3000](http://localhost:3000).

## Useful Commands

- Stop the stack:  
  ```sh
  docker-compose down
  ```

- View logs:  
  ```sh
  docker-compose logs -f
  ```

## Project Structure

- `weather-subscription/` — NestJS application source code and Docker setup
- `.env.example` — Example environment variables for the app
- `docker.env.example` — Example environment variables for Docker services

## License

MIT © 2025 Anna Tolstova

