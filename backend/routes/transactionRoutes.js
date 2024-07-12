const express = require("express");
const router = express.Router();
const Transaction = require("../models/Transaction");
const UserProgress = require("../models/UserProgress");
const Profile = require("../models/Profile");
const Quiz = require("../models/Quiz");
const Course = require("../models/Course");
const Item = require("../models/Item");
const { authenticateTokenRest } = require("../middleware/authenticate");
const logger = require("../middleware/logger");
const mongoose = require("mongoose");

router.post("/record-progress", authenticateTokenRest, async (req, res) => {
  try {
    const { quizId, quizScore, quizTimeTaken } = req.body;
    const userId = req.user.userId;

    logger.info("Recording progress", {
      userId,
      quizId,
      quizScore,
      quizTimeTaken,
    });
    // 1. Check if the quiz exists
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      logger.warn("Quiz not found", { quizId });
      return res.status(404).json({ error: "Quiz not found" });
    }
    const course = await Course.findOne({
      quizzes: quizId,
    });
    if (!course) {
      logger.warn("Course not found for quiz", { quizId });
      return res.status(404).json({ error: "Course not found for quiz" });
    }
    const courseId = course._id;

    // 2. Check if the user is already enrolled in the course
    let userProgress = await UserProgress.findOne({ userId, courseId });
    if (!userProgress) {
      logger.info("Creating new UserProgress record", { userId, courseId });
      userProgress = new UserProgress({
        userId,
        courseId,
        score: 0,
        timeTaken: 0,
        completedQuizzes: [],
      });
    }

    // 3. Check if the user has already completed the quiz
    const completedQuizIndex = userProgress.completedQuizzes.findIndex(
      (completedQuiz) => completedQuiz.quizId.toString() === quizId
    );

    if (completedQuizIndex > -1) {
      // Quiz has been completed before
      logger.warn("Quiz already completed", { userId, quizId });
      return res.status(400).json({ error: "Quiz already completed" });
    } else {
      // Add new quiz data if not completed before
      userProgress.completedQuizzes.push({
        quizId,
        score: quizScore,
        timeTaken: quizTimeTaken,
        completedAt: new Date(),
      });
      userProgress.markModified("completedQuizzes");
    }

    // Update lastActive
    userProgress.lastActive = Date.now();

    await userProgress.save();

    // 5. Get updated progress and populate quiz details
    const updatedProgress = await UserProgress.findOne({
      userId,
      courseId,
    }).populate("completedQuizzes.quizId");

    logger.info("Progress recorded successfully", {
      userProgress: updatedProgress,
    });

    res.status(200).json({
      message: "Progress recorded successfully",
      userProgress: updatedProgress,
    });
  } catch (error) {
    logger.error("Failed to record progress", { error: error.message });
    res.status(500).json({ error: "Failed to record progress" });
  }
});

router.post("/buy-item", authenticateTokenRest, async (req, res) => {
  const { itemId } = req.body;
  const userId = req.user.userId;
  console.log("userId", userId);

  try {
    logger.info("Attempting to buy item", { itemId, userId });

    // 1. Check if item exists AND has enough quantity
    const item = await Item.findById(itemId);

    if (!item || item.quantity < 1) {
      throw new Error("Item not found or out of stock.");
    }
    const updateitem = await Item.updateOne(
      { _id: itemId, quantity: { $gte: 1 } },
      { $inc: { quantity: -1 } }
    );

    if (updateitem.nModified === 0) {
      throw new Error("Item not found or out of stock.");
    }

    // 2. Check if User Profile Exists and has enough funds
    const userProfile = await Profile.findOne({ userId }).populate("progress");
    if (!userProfile) {
      throw new Error("User profile not found.");
    }

    if (userProfile.balance < item.price) {
      throw new Error("Insufficient balance.");
    }

    // 3. Deduct user's balance, decrement the item quantity
    const updatedUserProfile = await Profile.findOneAndUpdate(
      { userId },
      {
        $inc: { balance: -item.price },
        $push: { purchasedItems: itemId },
      },
      { new: true }
    );

    if (!updatedUserProfile || updatedUserProfile.balance < 0) {
      throw new Error("Insufficient balance.");
    }

    item.quantity -= 1;
    await item.save();

    logger.info("Item purchased successfully", { itemId, userId });
    res.status(200).json({ message: "Item purchased successfully" });
  } catch (error) {
    logger.error("Error buying item:", {
      error: error.message,
      itemId,
      userId,
    });
    if (error.message === "Item not found or out of stock.") {
      res.status(404).json({ error: error.message });
    } else if (error.message === "Insufficient balance.") {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Failed to buy item" });
    }
  }
});

module.exports = router;
