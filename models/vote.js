const mongoose = require("mongoose");

const voteSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  candidate: { type: String, required: true },  // Kis candidate ko vote diya
  flatCode: { type: String, required: true },   // Flat ya society code ke liye
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Vote", voteSchema);
