/**
 * Middleware function to handle 404 errors (Not Found)
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
function notFound(req, res, next) {
  // Set the response status code to 404 (Not Found)
  res.status(404);

  // Create a new Error object with a custom message
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);

  // Pass the error to the next middleware function (error handler)
  next(error);
}

// Export the notFound middleware function
module.exports = notFound;
