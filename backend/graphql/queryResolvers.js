const Quiz = require("../models/Quiz");
const UserProgress = require("../models/UserProgress");
const Course = require("../models/Course");
const Profile = require("../models/Profile");
const User = require("../models/User");
const Item = require("../models/Item");
const { GraphQLError } = require("graphql");

module.exports = {
  quizzes: async () => {
    return await Quiz.find({});
  },
  quiz: async ({ id }) => {
    return await Quiz.findById(id);
  },
  languages: async () => {
    return await Course.distinct("language");
  },
  difficulties: async ({ language }) => {
    return await Course.distinct("difficulty", { language });
  },
  userProgress: async ({ userId }) => {
    return await UserProgress.find({ userId });
  },
  courses: async ({ language, difficulty }) => {
    const filter = {};
    if (language) filter.language = language;
    if (difficulty) filter.difficulty = difficulty;
    return await Course.find(filter);
  },
  profileByUserId: async ({ userId }) => {
    try {
      console.log("Querying for profile with userId:", userId);
      const profile = await Profile.findOne({ userId });
      return profile;
    } catch (error) {
      console.error("Error fetching user profile:", error);
      throw new Error("Error fetching user profile");
    }
  },
  getItems: async () => {
    try {
      const items = await Item.find();
      return items;
    } catch (error) {
      console.error("Error fetching store items:", error);
      throw new Error("Error fetching store items");
    }
  },
  profileByHandle: async ({ handle }) => {
    console.log("Querying for profile with handle:", handle);
    try {
      console.log("Querying for profile with handle:", handle);
      const profile = await Profile.findOne({ handle });
      return profile;
    } catch (error) {
      console.error("Error fetching user profile:", error);
      throw new Error("Error fetching user profile");
    }
  },
  enrolledCourses: async ({ userId }, context) => {
    try {
      //check if the user is authenticated
      if (!context.user) {
        throw new GraphQLError("User is not authenticated");
      }
      // Fetch User's Enrolled Courses and completed quizzes
      const userProgress = await UserProgress.find({ userId })
        .lean()
        .populate("completedQuizzes");

      if (!userProgress) {
        return []; // No enrolled courses found
      }
      const enrolledCourseIds = userProgress.map((record) => record.courseId);

      // Fetch enrolled courses with quizzes
      const enrolledCourses = await Course.find({
        _id: { $in: enrolledCourseIds },
      }).populate("quizzes"); // Populate the quiz details

      // Add isCompleted flag to each quiz
      const enrolledCoursesWithQuizProgress = enrolledCourses.map((course) => {
        const completedQuizIds = new Set(
          userProgress
            .find((progress) => progress.courseId.equals(course._id))
            ?.completedQuizzes.map((completedQuiz) =>
              completedQuiz.quizId.toString()
            ) || []
        );

        const quizzesWithProgress = course.quizzes.map((quiz) => ({
          ...quiz.toObject(),
          isCompleted: completedQuizIds.has(quiz._id.toString()),
        }));

        return {
          ...course.toObject(),
          quizzes: quizzesWithProgress,
        };
      });

      return enrolledCoursesWithQuizProgress;
    } catch (error) {
      console.error("Error fetching enrolled courses:", error);
      throw new Error("Error fetching enrolled courses");
    }
  },
  getCourse: async ({ courseId }, context) => {
    try {
      //check if the user is authenticated
      if (!context.user) {
        throw new GraphQLError("User is not authenticated");
      }
      // Fetch the course and populate quizzes
      const course = await Course.findById(courseId).populate("quizzes");
      if (!course) {
        throw new Error("Course not found");
      }
      const userId = context.user.userId;
      // Fetch user progress for the course
      const userProgress = await UserProgress.findOne({ userId, courseId });

      // Map quizzes to include user progress status
      const quizzesWithProgress = course.quizzes.map((quiz) => {
        const isCompleted = userProgress?.completedQuizzes.some(
          (completedQuiz) =>
            completedQuiz.quizId.toString() === quiz._id.toString()
        );
        return {
          ...quiz._doc,
          isCompleted,
        };
      });
      return {
        ...course._doc,
        quizzes: quizzesWithProgress,
      };
    } catch (error) {
      console.error("Error fetching course:", error);
      throw new Error("Error fetching course");
    }
  },
};
