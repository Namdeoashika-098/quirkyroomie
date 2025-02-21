const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const router = express.Router();
const { register, login } = require('../controllers/authController');

// ✅ User Registration Route
router.post("/register", async (req, res) => {
  try {
    console.log("📥 Registration Request:", req.body);

    const { name, email, password, flatCode } = req.body;
    if (!name || !email || !password || !flatCode) {
      return res.status(400).json({ error: "All fields are required" });
    }

    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "User already exists" }); // 409 -> Conflict
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword, flatCode });

    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("❌ Registration Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ User Login Route
router.post("/login", async (req, res) => {
  try {
    console.log("📥 Login Request:", req.body);

    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and Password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" }); // 401 -> Unauthorized
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate JWT Token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || "defaultsecret",
      { expiresIn: "1h" }
    );

    res.json({ message: "Login successful", token, user: { id: user._id, name: user.name, email: user.email, flatCode: user.flatCode } });
  } catch (error) {
    console.error("❌ Login Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
