const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth"); // ✅ Authentication Routes Import
const voteRoutes = require("./routes/vote");  // ✅ Import Vote Routes
const complaintRoutes = require("./routes/complaint");
const protectedRoute = require('./routes/protected');

dotenv.config();

const app = express();
app.use(express.json()); // ✅ Parse JSON bodies
app.use(bodyParser.json());
app.use(cors()); // ✅ Enable CORS

// ✅ Routes Setup
app.use("/api/vote", voteRoutes);  // Vote API
app.use("/api/complaints", complaintRoutes); // Complaint API
app.use("/api/auth", authRoutes);  // Auth API
app.use('/api', protectedRoute);   // Protected Routes

const PORT = process.env.PORT || 5000;

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// ✅ Base Route
app.get("/", (req, res) => {
  res.send("🚀 QuirkyRoomie Backend Running!");
});

// ✅ Test Route
app.post("/test", (req, res) => {
  console.log("✅ Test route hit");
  res.status(200).json({ message: "Test successful" });
});

// ✅ GET Route to Fetch All Complaints
app.get("/api/complaints", (req, res) => {
  // Dummy complaints data (replace with DB logic if needed)
  const complaints = [
    { _id: "1", title: "Broken Street Light", description: "Street light not working." },
    { _id: "2", title: "Water Leakage", description: "Water leaking in block A." }
  ];
  res.status(200).json(complaints);
});

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
