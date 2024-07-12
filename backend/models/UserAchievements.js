const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const userAchievementSchema = new mongoose.Schema({
  userId: {
    type: ObjectId,
    ref: "User",
    required: true,
  },
  achievementId: {
    type: ObjectId,
    ref: "Achievement",
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const UserAchievement = mongoose.model(
  "UserAchievement",
  userAchievementSchema
);

module.exports = UserAchievement;
