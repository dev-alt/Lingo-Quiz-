const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const userProgressSchema = new mongoose.Schema(
  {
    userId: { type: ObjectId, ref: "User", required: true },
    courseId: { type: ObjectId, ref: "Course", required: true },
    completedQuizzes: [
      {
        quizId: { type: ObjectId, ref: "Quiz" },
        score: { type: Number, default: 0, min: 0 },
        timeTaken: { type: Number, default: 0, min: 0 },
        completedAt: { type: Date, default: Date.now },
      },
    ],
    score: { type: Number, default: 0, min: 0 },
    timeTaken: { type: Number, default: 0, min: 0 },
    lastActive: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

userProgressSchema.index({ userId: 1, courseId: 1 });

const UserProgress = mongoose.model("UserProgress", userProgressSchema);

module.exports = UserProgress;
