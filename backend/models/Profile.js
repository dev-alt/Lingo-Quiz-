const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const profileSchema = new mongoose.Schema({
  userId: { type: ObjectId, ref: "User", required: true, unique: true },
  username: { type: String, required: true },
  handle: { type: String, required: true, unique: true },
  bio: { type: String },
  level: { type: Number, default: 1 },
  xp: { type: Number, default: 0 },
  balance: { type: Number, required: true, default: 0 },
  challengesCompleted: { type: Number, default: 0 },
  rank: {
    type: String,
    enum: ["Bronze", "Silver", "Gold", "Platinum", "Diamond"],
    default: "Bronze",
  },
  badges: { type: Number, default: 0 },
  streak: { type: Number, default: 0 },
  achievements: [{ type: ObjectId, ref: "UserAchievement" }],
  progress: [{ type: ObjectId, ref: "UserProgress" }],
  joinDate: { type: Date, default: Date.now },
  lastActive: { type: Date, default: Date.now },
  purchasedItems: [{ type: ObjectId, ref: "Item" }],

  avatarUrl: String,
  bannerUrl: String,

  // NFT Integration (Future)
  ownedBanners: [
    {
      tokenId: String,
      contractAddress: String,
    },
  ],
  ownedAvatars: [
    {
      tokenId: String,
      contractAddress: String,
    },
  ],
});

const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;
