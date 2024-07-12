const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const transactionSchema = new mongoose.Schema({
  userAddress: { type: String, required: false },
  userId: { type: ObjectId, ref: "User", required: true },
  quizId: { type: String, required: true },
  score: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
  transactionHash: { type: String },
});

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
