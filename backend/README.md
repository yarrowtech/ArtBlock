# Artblock Backend

## Overview
The Artblock Backend is a Node.js application built with Express.js and MongoDB. It provides authentication functionalities, allowing users to register and log in to the application. The backend is structured to separate concerns, making it easy to maintain and extend.

## Project Structure
```
artblock-backend
├── src
│   ├── controllers          # Contains the logic for handling requests
│   │   └── auth.controller.js
│   ├── models               # Defines the data models
│   │   └── user.model.js
│   ├── routes               # Defines the API routes
│   │   └── auth.routes.js
│   ├── middlewares          # Contains middleware functions
│   │   └── auth.middleware.js
│   ├── config               # Configuration files
│   │   └── db.js
│   └── app.js              # Entry point of the application
├── .env                     # Environment variables
├── package.json             # Project metadata and dependencies
└── README.md                # Project documentation
```

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd artblock-backend
   ```

2. Install the dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory and add your MongoDB connection string and any other necessary environment variables:
   ```
   MONGODB_URI=<your_mongodb_connection_string>
   JWT_SECRET=<your_jwt_secret>
   ```

## Usage

1. Start the application:
   ```
   npm start
   ```

2. The server will run on `http://localhost:5000` (or the port specified in your configuration).

## API Endpoints

- **POST /api/auth/register**: Register a new user.
- **POST /api/auth/login**: Log in an existing user.
- **POST /api/posts**: Create a new post (requires authentication, multipart/form-data with fields: title, content, media, mediaType).

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License
This project is licensed under the MIT License.