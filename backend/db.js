const mongoose = require("mongoose");
const logger = require("../backend/middleware/logger");

require("dotenv").config();

const MONGODB_URI = process.env.MONGODB_URI;
console.log("MONGODB_URI:", MONGODB_URI);

async function connectToMongoDB(retries = 5) {
  while (retries) {
    try {
      await mongoose.connect(MONGODB_URI);
      console.log = (message) => logger.info(message);
      console.log("Connected to MongoDB");
      break;
    } catch (err) {
      console.error("MongoDB connection error:", err.name);
      console.error("Error message:", err.message);
      // Log additional details based on the error type
      if (err.name === "MongoError") {
        console.error("Error code:", err.code);
      }
      console.error = (message) => logger.error(message);
      retries -= 1;
      console.log(`Retries left: ${retries}`);
      await new Promise((res) => setTimeout(res, 5000));
    }
  }
}

module.exports = connectToMongoDB;
