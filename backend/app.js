const express = require("express");
const cors = require("cors");
const { createHandler } = require("graphql-http/lib/use/express");
const { buildSchema } = require("graphql");
const fs = require("fs");
const path = require("path");
const { authenticateTokenGraphql } = require("./middleware/authenticate");
const connectToMongoDB = require("./db");
const logger = require("./middleware/logger");
const testRoutes = require("./routes/testRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const userRoutes = require("./routes/userRoutes");
const quizRoutes = require("./routes/quizRoutes");
const profileRoutes = require("./routes/profileRoutes");
const root = require("./graphql/resolvers");

require("dotenv").config(); // Load environment variables from .env file

// Routes
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use((err, req, res, next) => {
  // Error handling middleware
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? "🥞" : err.stack,
  });
});

// GraphQL
// Read the schema from the file
const schemaString = fs.readFileSync(
  path.join(__dirname, "graphql/schema.graphql"),
  "utf8"
);
const schema = buildSchema(schemaString); // Build the GraphQL schema

connectToMongoDB(); // Connect to MongoDB

async function startServer() {
  app.use(
    "/graphql",
    createHandler({
      schema: schema,
      rootValue: root,
      graphiql: true,
      context: async (req) => {
        let user;
        try {
          user = await authenticateTokenGraphql(req); // Authenticate the user using the token
        } catch (err) {
          console.error("Authentication error:", err);
          user = null;
        }
        return { user };
      },
    })
  );

  // Routes
  app.use("/api/users/", userRoutes);
  app.use("/api/quizzes/", quizRoutes);
  app.use("/api/profiles/", profileRoutes);
  app.use("/test/", testRoutes);
  app.use("/api/transactions/", transactionRoutes);

  // Set up the server after the contracts are initialized
  const PORT = process.env.PORT || 7100; // Set the server port
  app.listen(PORT, () => {
    // Show connection details
    console.log = (message) => logger.info(message);
    console.log(`Server running on port ${PORT}`);
    console.log(`http://localhost:${PORT}`);
  });
}

startServer();
