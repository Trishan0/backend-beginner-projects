# Todo List API

A simple RESTful CRUD API for managing todo items with user authentication built using Node.js, Express, and MongoDB.

## Features

- 🔐 User authentication (register/login) with JWT
- ✅ Complete CRUD operations for todo items
- 📝 Auto-incrementing IDs for todos
- 📄 Pagination support for listing todos
- 🔒 Protected routes with middleware authentication

## Tech Stack

- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing

## Prerequisites

Before running this project, make sure you have the following installed:

- Node.js (v14+)
- MongoDB (local instance or MongoDB Atlas account)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Trishan0/backend-beginner-projects.git
   cd todo-list-api-js
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=3000
   MONGODB_URI=Your_mongodb_uri_here
   JWT_SECRET_KEY=your_secret_key_here
   ```

## Running the Application

Start the development server:

```bash
npm run dev
```

The server will run at `http://localhost:3000` by default (or the PORT you specified in the `.env` file).

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login and get access token |

### Todo Management

All todo endpoints require authentication. Include the JWT token in the Authorization header:
`Authorization: Bearer your_token_here`

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/todos` | Create a new todo |
| GET | `/api/todos` | Get all todos (with pagination) |
| GET | `/api/todos/:id` | Get a specific todo by ID |
| PUT | `/api/todos/:id` | Update a todo by ID |
| DELETE | `/api/todos/:id` | Delete a todo by ID |

## API Request & Response Examples

### Authentication

#### Register a new user
```
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "success": true,
  "message": "User created successfully"
}
```

#### Login
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "success": true,
  "message": "Logged in successfully",
  "user": {
    "id": "user_id_here",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "accessToken": "jwt_token_here"
}
```

### Todo Operations

#### Create a new todo
```
POST /api/todos
Authorization: Bearer jwt_token_here
Content-Type: application/json

{
  "title": "Complete project",
  "description": "Finish the todo API project"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Complete project",
    "description": "Finish the todo API project",
    "date": "2025-05-10T00:00:00.000Z",
    "createdAt": "2025-05-10T00:00:00.000Z",
    "updatedAt": "2025-05-10T00:00:00.000Z"
  }
}
```

#### Get all todos (with pagination)
```
GET /api/todos?page=1&limit=10
Authorization: Bearer jwt_token_here
```

Response:
```json
{
  "success": true,
  "total": 5,
  "page": 1,
  "limit": 10,
  "data": [
    {
      "id": 5,
      "title": "Latest todo",
      "description": "This is the most recent todo",
      "date": "2025-05-10T00:00:00.000Z",
      "createdAt": "2025-05-10T00:00:00.000Z",
      "updatedAt": "2025-05-10T00:00:00.000Z"
    }
  ]
}
```

## Error Handling

The API returns appropriate HTTP status codes along with JSON responses:

- `400` - Bad Request (missing required fields, validation errors)
- `401` - Unauthorized (invalid or missing JWT token)
- `404` - Not Found (resource not found)
- `500` - Internal Server Error

Example error response:
```json
{
  "success": false,
  "message": "Error message here",
  "error": "Detailed error information (in development only)"
}
```

## Project Structure

```
todo-list-api/
│
├── src/
│   ├── config/         # Configuration files
│   ├── controllers/    # Request handlers
│   ├── database/       # Database connection
│   ├── middlewares/    # Custom middleware functions
│   ├── models/         # Mongoose models
│   ├── routes/         # API routes
│   ├── services/       # Business logic
│   └── app.js          # Express app initialization
│
├── .env                # Environment variables (not in repo)
├── .gitignore          # Git ignore file
├── package.json        # Project metadata and dependencies
└── README.md           # Project documentation
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Author

Trishan Fernando
