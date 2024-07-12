const Quiz = require("../models/Quiz");
const UserProgress = require("../models/UserProgress");
const Course = require("../models/Course");
const Profile = require("../models/Profile");
const User = require("../models/User");
const Item = require("../models/Item");
const Transaction = require("../models/Transaction");
const authenticateToken = require("../middleware/authenticate");
const { GraphQLError } = require("graphql");

module.exports = {
  enrollInCourse: async ({ userId, courseId }) => {
    try {
      // 1. Check if already enrolled
      const existingProgress = await UserProgress.findOne({
        userId,
        courseId,
      });
      console.log("Existing Progress:", existingProgress);
      if (existingProgress) {
        console.log("Already enrolled in this course.");
        return {
          success: false,
          message: "Already enrolled in this course.",
        };
      }
      console.log("Not already enrolled");

      // 2. Check if user and course exist
      const user = await User.findById(userId);
      const course = await Course.findById(courseId);

      if (!user) {
        console.error("User not found");
        return {
          success: false,
          message: "User not found.",
        };
      }

      if (!course) {
        console.error("Course not found");
        return {
          success: false,
          message: "Course not found.",
        };
      }

      // 3. Create new UserProgress record
      const newProgress = new UserProgress({ userId, courseId });
      const savedProgress = await newProgress.save();
      console.log("Saved Progress:", savedProgress);

      return {
        success: true,
        message: "Successfully enrolled in the course.",
      };
    } catch (error) {
      console.error("Error enrolling in course:", error);
      return {
        success: false,
        message: error.message || "An error occurred",
      };
    }
  },
  testMutation: ({ message }) => {
    console.log("Test mutation called with message:", message);
    return {
      success: true,
      echo: message,
    };
  },
  addItem: async ({ name, description }) => {
    console.log(
      "Adding item with name:",
      name,
      "and description:",
      description
    );
    const item = new Item({ name, description });
    await item.save();
    return item;
  },
  unenrollFromCourse: async ({ userId, courseId }) => {
    console.log("Starting unenrollFromCourse mutation with input:", {
      userId,
      courseId,
    });

    try {
      // 1. Check if enrolled
      const existingProgress = await UserProgress.findOne({
        userId,
        courseId,
      });
      console.log("Existing Progress:", existingProgress);
      if (!existingProgress) {
        console.log("Not enrolled in this course.");
        return {
          success: false,
          message: "Not enrolled in this course.",
        };
      }
      console.log("Already enrolled");

      // 2. Delete UserProgress record
      await UserProgress.deleteOne({ userId, courseId });

      return {
        success: true,
        message: "Successfully unenrolled from the course.",
      };
    } catch (error) {
      console.error("Error unenrolling from course:", error);
      return {
        success: false,
        message: error.message || "An error occurred",
      };
    }
  },
  createQuiz: async ({ input, courseId }) => {
    try {
      // 1. Authentication (if needed)

      // 2. Create new quiz
      const newQuiz = new Quiz(input);
      const savedQuiz = await newQuiz.save();

      // 3. Link quiz to course
      const course = await Course.findById(courseId);
      if (!course) {
        throw new Error("Course not found");
      }
      course.quizzes.push(savedQuiz._id);
      await course.save();
      console.log("Quizzes added to course");
      return {
        success: true,
        message: "Quiz created and linked to course successfully",
        quiz: savedQuiz,
      };
    } catch (error) {
      console.error("Error creating and linking quiz:", error);
      return { success: false, message: error.message };
    }
  },
  //
  storeQuizResult: async ({ quizId, score }, context) => {
    try {
      // 1. Authentication
      if (!context.user) {
        throw new AuthenticationError(
          "You must be logged in to store results."
        );
      }
      console.log("User authenticated:", context.user);

      // 2. Get user's blockchain address
      const user = await User.findById(context.user.userId);

      // Ensure the user exists
      if (!user) {
        throw new Error("User not found");
      }
      console.log("Fetched user: ", user);

      // Ensure the blockchainAddress exists on the user
      if (!user.blockchainAddress) {
        throw new Error("User does not have a blockchain address");
      }
      console.log("Fetched address: ", user.blockchainAddress);

      const userAddress = user.blockchainAddress;

      // 3. Store result in smart contract
      const receipt = await context.quizResultsContract.methods
        .storeResult(quizId, score)
        .send({
          from: userAddress,
          gas: 500000,
          type: "0x0",
        });

      // 4. Store transaction details in your database (Optional)
      const newTransaction = new Transaction({
        userAddress,
        quizId,
        score,
        transactionHash: receipt.transactionHash,
      });
      await newTransaction.save();
      // 5. Get updated progress if you want to return it
      const updatedProgress = await UserProgress.find({ userId: user._id });

      return {
        success: true,
        message: "Quiz result stored on blockchain",
        txHash: receipt.transactionHash,
        userProgress: updatedProgress,
      };
    } catch (error) {
      console.error("Error storing quiz result: ", error);

      if (error.name === "AuthenticationError") {
        return new GraphQLError(error.message, {
          extensions: { code: "UNAUTHENTICATED" },
        });
      } else if (error.name === "UserInputError") {
        return new GraphQLError(error.message, {
          extensions: { code: "BAD_USER_INPUT" },
        });
      } else if (error.name === "ForbiddenError") {
        return new GraphQLError(error.message, {
          extensions: { code: "FORBIDDEN" },
        });
      }

      // If it is a general error:
      return new GraphQLError(error.message, {
        extensions: { code: "INTERNAL_SERVER_ERROR" },
      });
    }
  },
};
