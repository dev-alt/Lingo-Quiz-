const express = require("express");
const router = express.Router();
const Quiz = require("../models/Quiz");
const UserProgress = require("../models/UserProgress");
const Course = require("../models/Course");
const courseSchema = Course.schema;
const { authenticateTokenRest } = require("../middleware/authenticate");
const logger = require("../middleware/logger");
const mongoose = require("mongoose");

router.post("/create", async (req, res) => {
  try {
    const quizData = req.body;

    // Ensure courseId is provided in the request
    if (!quizData.courseId) {
      return res.status(400).json({ error: "Missing courseId" });
    }

    // Validate courseId and check if course exists
    if (!mongoose.Types.ObjectId.isValid(quizData.courseId)) {
      return res.status(400).json({ error: "Invalid courseId" });
    }

    const course = await Course.findById(quizData.courseId);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    // Create and save the new quiz
    const quiz = new Quiz(quizData);
    const savedQuiz = await quiz.save();

    // Update the course's quizzes array
    course.quizzes.push(savedQuiz._id);
    await course.save();

    res.status(201).json({
      message: "Quiz created successfully and linked to course",
      quizId: savedQuiz._id,
    });
  } catch (error) {
    console.error("Error creating quiz:", error);
    res.status(500).json({ error: "Failed to create quiz" });
  }
});

router.post("/createCourse", async (req, res) => {
  try {
    const courseData = req.body;

    // Data Validation
    const requiredFields = [
      "title",
      "language",
      "difficulty",
      "description",
      "imageUrl",
    ];

    for (const field of requiredFields) {
      if (!courseData[field]) {
        return res
          .status(400)
          .json({ error: `Missing required field: ${field}` });
      }
    }

    //Check that language and difficulty are part of our allowed enums
    if (
      !courseSchema.path("language").enumValues.includes(courseData.language)
    ) {
      return res
        .status(400)
        .json({ error: `Invalid language: ${courseData.language}` });
    }
    if (
      !courseSchema
        .path("difficulty")
        .enumValues.includes(courseData.difficulty)
    ) {
      return res
        .status(400)
        .json({ error: `Invalid difficulty: ${courseData.difficulty}` });
    }

    // Create a new course instance
    const newCourse = new Course(courseData);

    // Save the course to the database
    const savedCourse = await newCourse.save();

    res.status(201).json({
      message: "Course created successfully",
      courseId: savedCourse._id,
    });
  } catch (error) {
    console.error("Error creating course:", error);
    res.status(500).json({ error: "Failed to create course" });
  }
});

router.get("/languages", async (req, res) => {
  try {
    const languages = await Quiz.distinct("language");
    res.json(languages);
  } catch (error) {
    console.error("Error fetching languages:", error);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/difficulties/:language", async (req, res) => {
  const { language } = req.params;
  try {
    const difficulties = await Quiz.distinct("difficulty", { language });
    res.json(difficulties);
  } catch (error) {
    console.error("Error fetching difficulties:", error);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/:language/:difficulty", async (req, res) => {
  const { language, difficulty } = req.params;
  try {
    const quizzes = await Quiz.find({ language, difficulty });
    res.json(quizzes);
  } catch (error) {
    console.error("Error fetching quizzes:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Validate and calculate the score for the quiz answers
router.post("/validate-answers", authenticateTokenRest, async (req, res) => {
  const { quizId, userAnswers, quizTimeTaken } = req.body;

  try {
    logger.info("Validating quiz answers", { quizId, userAnswers });
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      logger.warn("Quiz not found", { quizId });
      return res.status(404).json({ error: "Quiz not found" });
    }
    const { difficulty } = quiz;

    // Calculate the score and results
    const { score, results } = calculateQuizScore(
      quiz.questions,
      userAnswers,
      quizTimeTaken,
      quizId,
      difficulty
    );
    logger.info("Quiz validated successfully", { quizId, score, results });
    res.status(200).json({ score, results });
  } catch (error) {
    logger.error("Error validating quiz answers:", {
      error: error.message,
      stack: error.stack,
      quizId,
      userAnswers,
    });
    res.status(500).json({ error: "Failed to validate quiz answers" });
  }
});

// Define the difficulty weights for scoring
const difficultyWeights = {
  Beginner: 5,
  Intermediate: 10,
  Advanced: 15,
};

// Define the streak bonus map for scoring
const streakBonusMap = {
  3: 2,
  4: 4,
  5: 6,
};

// Calculate the score for the quiz
function calculateQuizScore(
  questions,
  userAnswers,
  timeTaken,
  quizId,
  quizDifficulty
) {
  try {
    const maxTime = 300;
    let score = 0;
    let streak = 0;
    let streakBonus = 0;
    const results = [];
    logger.debug("Starting score calculation", {
      quizId,
      userAnswers,
      timeTaken,
      quizDifficulty,
    });
    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];
      const userAnswer = userAnswers[i];
      const isCorrect = userAnswer === question.answer;
      logger.debug(`Validating question ${i + 1}`, { question, userAnswer });
      if (isCorrect) {
        // Increase the score based on the difficulty weight
        score += difficultyWeights[quizDifficulty] || 10;
        streak++;
        streakBonus = streakBonusMap[streak] || 0;
      } else {
        // Reset the streak and streak bonus if the answer is incorrect
        streak = 0;
        streakBonus = 0;
        score -= 2;
        logger.debug("Incorrect answer, streak reset");
      }
      results.push({
        questionText: question.question,
        correctAnswer: question.options[question.answer],
        userAnswer: question.options[userAnswer],
        isCorrect,
      });
    }
    // Calculate the time bonus based on the time taken
    const timeBonus = Math.max(0, maxTime - Math.pow(timeTaken, 1.5) / 100);
    logger.debug("Time bonus calculated", { timeBonus });
    // Calculate the final score with bonuses
    const finalScore = Math.ceil(score + streakBonus + timeBonus);
    logger.info("Final quiz score (with bonuses):", finalScore);
    return {
      score: finalScore,
      results,
    };
  } catch (error) {
    logger.error("Error calculating quiz score:", {
      error: error.message,
      stack: error.stack,
      quizId,
      userAnswers,
      quizDifficulty,
    });
    throw error;
  }
}

module.exports = router;
