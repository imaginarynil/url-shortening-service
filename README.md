# URL Shortening Service

A full-stack application to shorten a URL. The app can create, retrieve, update, delete, get statistics, and create a custom shortened URL. The short code is the database ID in `base62`, which guarantees the uniqueness.

This is a solution for [URL Shortening Service](https://roadmap.sh/projects/url-shortening-service).

## Features

- Create a new short URL
- Retrieve an original URL from a short URL
- Update an existing short URL
- Delete an existing short URL
- Get statistics on a short URL (i.e. how many times a short URL has been accessed)
- Create a custom short URL

## Getting Started

### Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [Node.js (for development)](https://nodejs.org/en/download)

### Installation

#### Development

1. Clone this repository

```
git clone https://github.com/imaginarynil/url-shortening-service.git
```

2. Run the API and database using Docker Compose (use Powershell on Windows)

```
docker compose -f compose.dev.yaml up --build
```

3. Go to `ui`, install dependencies, and run the Next app in `dev` mode. You need to have npm installed on your machine.

```
cd ui
npm install
npm run dev
```

4. Change the `/ui/.env` to these values

```
NEXT_PUBLIC_API_BASE_URL_SERVER=http://localhost:8080
NEXT_PUBLIC_API_BASE_URL_CLIENT=http://localhost:8080
NEXT_PUBLIC_UI_BASE_URL=http://localhost:3000
```

5. Open `http://localhost:3000/` on your browser to access the UI. API is available at `http://localhost:8080/`.

#### Production

1. Clone this repository

```
git clone https://github.com/imaginarynil/url-shortening-service.git
```

2. Run docker compose using the `compose.prod.yaml` (use Powershell on Windows)

```
docker compose -f compose.prod.yaml up --build
```

3. Open `http://localhost:3000/` on your browser to access the UI. API is available at `http://localhost:8080/`.

## API Endpoints

### POST /shorten

Create a new short URL with a unique short code

- **Request**
  - Method: POST
  - Content-Type: application/json
  - Body:

  ```
  {
    "url": "https://www.youtube.com/watch?v=Rxz4fUjakfI"
  }
  ```

- **Response**
  - **Success**
    - Status: 201 Created
    - Body:

    ```
    {
      "id": 1,
      "url": "https://www.youtube.com/watch?v=Rxz4fUjakfI",
      "shortCode": "000001",
      "createdAt": "12-11-2026 07:59:34",
      "updatedAt": "12-11-2026 07:59:34"
    }
    ```

  - **Fail**
    - If the request body is invalid
      - Status: 400 Bad Request

### GET /shorten/<short_code>

Retrieve the original URL from a short code and increment the access count

- **Request**
  - Method: GET
  - Path variable: `short_code` (string of letters and numbers)

- **Response**
  - **Success**
    - Status: 200 OK
    - Body:

    ```
    {
      "id": 1,
      "url": "https://www.youtube.com/watch?v=Rxz4fUjakfI",
      "shortCode": "000001",
      "createdAt": "12-11-2026 07:59:35",
      "updatedAt": "12-11-2026 08:02:01"
    }
    ```

  - **Fail**
    - If `short_code` does not exist
      - Status: 404 Not Found

### PUT /shorten/<short_code>

Update the URL of a short code

- **Request**
  - Method: PUT
  - Path variable: `short_code` (string of letters and numbers)
  - Content-Type: application/json
  - Body:

  ```
  {
    "url": "https://www.youtube.com/watch?v=XfNntix9aDA"
  }
  ```

- **Response**
  - **Success**
    - Status: 200 OK
    - Body:

    ```
    {
      "id": 1,
      "url": "https://www.youtube.com/watch?v=XfNntix9aDA",
      "shortCode": "000001",
      "createdAt": "12-11-2026 07:59:35",
      "updatedAt": "12-11-2026 08:03:44"
    }
    ```

  - **Fail**
    - If the request body is invalid
      - Status: 400 Bad Request
    - If `short_code` does not exist
      - Status: 404 Not Found

### DELETE /shorten/<short_code>

Delete a short URL using the short code

- **Request**
  - Method: DELETE
  - Path variable: `short_code` (string of letters and numbers)

- **Response**
  - **Success**
    - Status: 204 No Content

  - **Fail**
    - If `short_code` does not exist
      - Status: 404 Not Found

### GET /shorten/<short_code>/stats

Get the statistics (e.g. access count) of a short code

- **Request**
  - Method: GET
  - Path variable: `short_code` (string of letters and numbers)

- **Response**
  - **Success**
    - Status: 200 OK
    - Body:

    ```
    {
      "accessCount": 3,
      "createdAt": "12-11-2026 07:59:35",
      "id": 1,
      "shortCode": "000001",
      "updatedAt": "12-11-2026 08:05:58",
      "url": "https://www.youtube.com/watch?v=XfNntix9aDA"
    }
    ```

  - **Fail**
    - If `short_code` does not exist
      - Status: 404 Not Found

### POST /shorten/custom

Create a URL with a custom short code. This feature does not allow collision with the existing database IDs.

- **Request**
  - Method: POST
  - Content-Type: application/json
  - Body:

  ```
  {
    "url": "https://www.youtube.com/watch?v=25BEQyEpymU",
    "shortCode": "ChristmasCookie"
  }
  ```

- **Response**
  - **Success**
    - Status: 201 Created
    - Body:

    ```
    {
      "id": 3,
      "url": "https://www.youtube.com/watch?v=25BEQyEpymU",
      "shortCode": "ChristmasCookie",
      "createdAt": "12-11-2026 08:07:09",
      "updatedAt": "12-11-2026 08:07:09"
    }
    ```

  - **Fail**
    - If the request body is invalid or `short_code` collides with the database current or future IDs
      - Status: 400 Bad Request

## Tech Stack

- Spring Boot
- MySQL
- Next.js + Ant Design

## TODO

- [ ] Add tests on the API
