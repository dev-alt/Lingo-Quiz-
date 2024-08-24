# LingoQuiz

LingoQuiz is an interactive language learning platform that offers engaging quizzes, personalized learning experiences, and community challenges to help users improve their language skills.

## Features

- Interactive language quizzes
- Personalized learning paths
- Community challenges and leaderboards
- Reward system for completed quizzes
- User profiles and progress tracking
- Course enrollment and management
- In-app store for additional resources

## Technology Stack

- **Frontend**: Next.js 14 (React), TypeScript
- **UI Framework**: NextUI v2
- **Styling**: Tailwind CSS, Tailwind Variants
- **State Management**: Apollo Client (for GraphQL)
- **Animations**: Framer Motion
- **Icons**: Iconify
- **Authentication**: Custom JWT-based auth system
- **API**: GraphQL

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Set up environment variables (create a `.env.local` file based on `.env.example`)
4. Run the development server:
   ```
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

- `/app`: Next.js app router and page components
- `/components`: Reusable React components
- `/context`: React context providers (e.g., AuthContext)
- `/queries`: GraphQL queries and mutations
- `/styles`: Global styles and Tailwind config
- `/types`: TypeScript type definitions

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
