const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  language: {
    type: String,
    required: true,
    enum: ["English", "Spanish", "Japanese", "French", "German"],
  },
  difficulty: {
    type: String,
    required: true,
    enum: ["Beginner", "Intermediate", "Advanced"],
  },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  duration: { type: Number },
  quizzes: [{ type: ObjectId, ref: "Quiz" }],
  prerequisites: [{ type: ObjectId, ref: "Course" }],
  averageRating: { type: Number, default: 0 },
  totalReviews: { type: Number, default: 0 },
  reviews: [
    {
      userId: { type: ObjectId, ref: "User", required: true },
      rating: { type: Number, required: true, min: 1, max: 5 },
      comment: String,
    },
  ],
  tags: [String],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
