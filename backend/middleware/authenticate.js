// middleware/authenticate.js
const jwt = require("jsonwebtoken");
const { GraphQLError } = require("graphql");
require("dotenv").config();
const logger = require("./logger"); // Import your Winston logger
const { JWT_SECRET } = process.env;

/**
 * Middleware function to authenticate a token for GraphQL requests.
 *
 * @param {Object} req - The request object.
 * @returns {Object|undefined} - The user object if authenticated, otherwise throws a GraphQLError.
 */
const authenticateTokenGraphql = async (req) => {
  const authHeader = req.headers.authorization;
  logger.info("GraphQL authentication attempt", { authHeader }); // Log attempt

  if (!authHeader) {
    logger.warn("GraphQL authentication failed: No Authorization header");
    throw new GraphQLError("Authorization header must be provided");
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    logger.warn("GraphQL authentication failed: No token provided");
    throw new GraphQLError("No token provided");
  }

  try {
    const user = jwt.verify(token, JWT_SECRET);
    logger.info("GraphQL authentication successful", { userId: user.userId }); // Log successful auth with user ID
    return user; // Return the user object
  } catch (err) {
    logger.error("GraphQL authentication failed: Invalid token", {
      error: err.message,
    }); // Log failure with error message
    throw new GraphQLError("Failed to authenticate token");
  }
};

/**
 * Middleware function to authenticate a token for REST API requests.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Object|undefined} - The response object or calls the next middleware function.
 */
const authenticateTokenRest = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1] || "";

  // logger.info("REST API authentication attempt", {
  //   authHeader: req.headers.authorization,
  // }); // Log attempt

  if (!token) {
    logger.warn("REST API authentication failed: No token provided");
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const user = jwt.verify(token, JWT_SECRET);
    req.user = user;
    logger.info("REST API authentication successful", { userId: user.userId }); // Log successful auth with user ID
    next();
  } catch (err) {
    logger.error("REST API authentication failed: Invalid token", {
      error: err.message,
    }); // Log failure with error message
    return res.status(403).json({ error: "Failed to authenticate token" });
  }
};

module.exports = { authenticateTokenGraphql, authenticateTokenRest };
