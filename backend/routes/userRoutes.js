const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const web3 = require("web3");
const Profile = require("../models/Profile");

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  console.log("Registering user:", username, email, password);

  try {
    // 1. Create Blockchain Account:
    const newAccount = await web3.eth.accounts.create();
    const blockchainAddress = newAccount.address;

    // 3. Create User in MongoDB:
    const user = new User({
      username,
      email,
      password: password,
      blockchainAddress,
    });
    const savedUser = await user.save();

    // 4. Create Profile
    const profileData = new Profile({
      userId: savedUser._id,
      username: username,
      handle: `@${username}`,
      level: 1,
      xp: 0,
      challengesCompleted: 0,
      rank: "Bronze",
      badges: 0,
      streak: 0,
      avatarUrl: null,
      bannerUrl: null,
    });
    const profile = new Profile(profileData);
    const savedProfile = await profile.save();

    if (savedUser && savedProfile) {
      res.status(201).json({
        message: "User and profile registered successfully",
        blockchainAddress,
        profileId: savedProfile._id,
      });
    } else {
      throw new Error("Failed to create user or profile");
    }
  } catch (error) {
    console.error("Registration Error:", error);
    if (error.code === 11000) {
      const duplicateKeyField = Object.keys(error.keyValue)[0];
      res.status(409).json({ error: `${duplicateKeyField} already exists` });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log("Logging in user:", email, password);

  try {
    // 1. Find user by email (case-insensitive search)
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid email credentials" });
    }

    // 2. Compare hashed passwords
    const isMatch = await bcryptjs.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid  password credentials" });
    }

    // 3. Generate and send JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "8h",
    });

    // Fetch the user profile
    const profile = await Profile.findOne({ userId: user._id });

    res.json({ token, user: profile });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ error: "An error occurred during login" });
  }
});

router.get("/profile", async (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
    if (err) return res.sendStatus(403);

    try {
      const profile = await User.findById(user.userId).select("-password");
      res.json(profile);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "An error occurred" });
    }
  });
});

router.put("/update", async (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
    if (err) return res.sendStatus(403);

    try {
      const profile = await User.findById(user.userId);
      profile.username = req.body.username;
      profile.email = req.body.email;
      await profile.save();
      res.json(profile);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "An error occurred" });
    }
  });
});
// router.delete("/delete", async (req, res) => {
//   const authHeader = req.headers["authorization"];
//   const token = authHeader && authHeader.split(" ")[1];

//   if (!token) return res.sendStatus(401);

//   jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
//     if (err) return res.sendStatus(403);

//     try {
//       await User.findByIdAndDelete(user.userId);
//       res.json({ message: "User deleted" });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: "An error occurred" });
//     }
//   });
// });

module.exports = router;
