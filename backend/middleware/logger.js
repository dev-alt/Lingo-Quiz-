const winston = require("winston");
const { combine, timestamp, json, printf, colorize, simple } = winston.format;
const path = require("path");

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  verbose: 4,
  debug: 5,
  silly: 6,
};

const logger = winston.createLogger({
  levels,
  format: combine(timestamp(), json()),
  transports: [
    // ------------------------------------------------------------------------
    // Console Transport
    // ------------------------------------------------------------------------
    new winston.transports.Console({
      level: "silly", // Log all levels to console
    }),

    // ------------------------------------------------------------------------
    // Error Log Transport
    // ------------------------------------------------------------------------
    new winston.transports.File({
      filename: path.join("logs", "error.log"), // Store in 'logs' directory
      level: "error", // Log only errors
    }),

    // ------------------------------------------------------------------------
    // Combined Log Transport
    // ------------------------------------------------------------------------
    new winston.transports.File({
      filename: path.join("logs", "combined.log"), // Store in 'logs' directory
      level: "info", // Log info and above
    }),

    // ------------------------------------------------------------------------
    // HTTP Log Transport
    // ------------------------------------------------------------------------
    new winston.transports.File({
      filename: path.join("logs", "http.log"),
      level: "http", // Log only HTTP requests
    }),
  ],
});

// Export the logger instance
module.exports = logger;
