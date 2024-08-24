# LinguoQuiz Express Backend

## Overview
LinguoQuiz is a language learning platform that offers quizzes, courses, and user progress tracking. This Express.js backend provides REST API and GraphQL endpoints to support the LinguoQuiz web application.

## Features
- User authentication and profile management
- Course and quiz creation and management
- User progress tracking
- GraphQL API for flexible data querying
- Integration with blockchain for quiz results storage
- Item shop functionality

## Tech Stack
- Node.js
- Express.js
- MongoDB (with Mongoose ORM)
- GraphQL (with graphql-http)
- JSON Web Tokens (JWT) for authentication
- Winston for logging
- Web3.js for blockchain integration

## Getting Started

### Prerequisites
- Node.js (v14 or later)
- MongoDB
- Ganache (for local blockchain testing)

### Installation
1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Set up environment variables in a `.env` file:
   ```
   PORT=7100
   MONGODB_URI=mongodb://localhost:27017/lingoquiz
   JWT_SECRET=your_jwt_secret_here
   ```
4. Start the server:
   ```
   npm start
   ```

## API Documentation

### REST Endpoints
- `/api/users/` - User registration and authentication
- `/api/quizzes/` - Quiz management
- `/api/profiles/` - User profile management
- `/api/transactions/` - Transaction handling
- `/test/` - Test routes for development

### GraphQL Endpoint
- `/graphql` - GraphQL API for querying and mutating data

## Project Structure
- `app.js` - Main application file
- `db.js` - Database connection setup
- `models/` - Mongoose models
- `routes/` - Express route handlers
- `middleware/` - Custom middleware functions
- `graphql/` - GraphQL schema and resolvers
- `logs/` - Application logs

## Contributing
Please read CONTRIBUTING.md for details on our code of conduct and the process for submitting pull requests.

## License
This project is licensed under the MIT License - see the LICENSE.md file for details.
