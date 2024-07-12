const express = require("express");
const router = express.Router();
const Profile = require("../models/Profile");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Helper function to get userId from JWT token
const getUserIdFromToken = (req) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.userId;
  } catch (error) {
    return null;
  }
};
//CREATE profile (POST /api/profile)
router.post("/", async (req, res) => {
  try {
    const userId = getUserIdFromToken(req);
    if (!userId) return res.sendStatus(401);

    const profileData = req.body;
    profileData.userId = userId;

    const profile = new Profile(profileData);
    const savedProfile = await profile.save();
    res.status(201).json(savedProfile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create profile" });
  }
});

// READ profile (GET /api/profile)
router.get("/", async (req, res) => {
  try {
    const userId = getUserIdFromToken(req);
    if (!userId) return res.sendStatus(401);

    const profile = await Profile.findOne({ userId });
    if (!profile) return res.status(404).json({ error: "Profile not found" });

    res.json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch profile" });
  }
});

// UPDATE profile (PUT /api/profile)
router.put("/", async (req, res) => {
  try {
    const userId = getUserIdFromToken(req);
    if (!userId) return res.sendStatus(401);

    const profileData = req.body;
    const updatedProfile = await Profile.findOneAndUpdate(
      { userId },
      profileData,
      { new: true }
    );
    res.json(updatedProfile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update profile" });
  }
});

// DELETE profile (DELETE /api/profile)
router.delete("/", async (req, res) => {
  try {
    const userId = getUserIdFromToken(req);
    if (!userId) return res.sendStatus(401);

    const deletedProfile = await Profile.findOneAndDelete({ userId });
    if (!deletedProfile)
      return res.status(404).json({ error: "Profile not found" });

    res.json({ message: "Profile deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete profile" });
  }
});

module.exports = router;
