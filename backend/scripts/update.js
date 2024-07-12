require("dotenv").config();
const mongoose = require("mongoose");
const Profile = require("../models/Profile");
const logger = require("../middleware/logger");

//SCRIPT to update MongoCollection
async function updateProfiles() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const updateResult = await Profile.updateMany(
      {},
      { $set: { balance: 0, purchasedItems: [] } }
    );

    logger.info("Profile updates complete!", {
      matchedCount: updateResult.matchedCount,
      modifiedCount: updateResult.modifiedCount,
    });

    console.log("Profile updates complete!");
  } catch (error) {
    logger.error("Error updating profiles:", { error: error.message });
    console.error("Error updating profiles:", error);
  } finally {
    mongoose.disconnect();
  }
}

updateProfiles();
