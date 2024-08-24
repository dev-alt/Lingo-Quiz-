# LingoQuiz

LingoQuiz is a comprehensive language learning platform that offers interactive quizzes, courses, and progress tracking. This repository contains both the frontend and backend code for the LinguoQuiz application.

## Project Structure

```
lingoquiz/
├── frontend/
│   └── [Frontend files and folders]
├── backend/
│   ├── app.js
│   ├── db.js
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── graphql/
│   └── [Other backend files and folders]
└── README.md
```

## Frontend

The frontend is built using [frontend technology, Next.JS]. For more details on the frontend implementation and setup, please refer to the `frontend/README.md` file.

## Backend

The backend is an Express.js application that provides both REST API and GraphQL endpoints. It uses MongoDB for data storage and integrates with blockchain technology for storing quiz results.

For more details on the backend implementation and setup, please refer to the `backend/README.md` file.

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- MongoDB
- Ganache (for local blockchain testing)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/dev-alt/lingoquiz.git
   cd lingoquiz
   ```

2. Set up the backend:
   ```
   cd backend
   npm install
   ```
   Create a `.env` file in the backend folder with necessary environment variables.

3. Set up the frontend:
   ```
   cd ../frontend
   npm install
   ```

4. Start the backend server:
   ```
   cd ../backend
   npm start
   ```

5. Start the frontend development server:
   ```
   cd ../frontend
   npm start
   ```

## Features

- User authentication and profile management
- Interactive language quizzes
- Course creation and management
- User progress tracking
- Blockchain integration for quiz result storage
- Virtual item shop

## Contributing

Please read `CONTRIBUTING.md` for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the `LICENSE.md` file for details.
