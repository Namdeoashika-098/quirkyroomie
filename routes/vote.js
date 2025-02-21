const express = require("express");
const Vote = require("../models/vote");
const router = express.Router();

// ✅ Cast a Vote
router.post("/cast", async (req, res) => {
  try {
    const { userId, candidate, flatCode } = req.body;

    if (!userId || !candidate || !flatCode) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if user has already voted
    const existingVote = await Vote.findOne({ userId, flatCode });
    if (existingVote) {
      return res.status(409).json({ error: "You have already voted!" });
    }

    const newVote = new Vote({ userId, candidate, flatCode });
    await newVote.save();

    res.status(201).json({ message: "Vote cast successfully!" });
  } catch (error) {
    console.error("❌ Voting Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ Get Votes (For counting)
router.get("/results/:flatCode", async (req, res) => {
  try {
    const { flatCode } = req.params;
    const votes = await Vote.find({ flatCode });

    // Count votes per candidate
    const results = {};
    votes.forEach((vote) => {
      results[vote.candidate] = (results[vote.candidate] || 0) + 1;
    });

    res.json({ results });
  } catch (error) {
    console.error("❌ Fetch Votes Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
