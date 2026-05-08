const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");

// Connect to Database
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Health Check Route
app.get("/api/health", (req, res) => {
  res.status(200).json({ message: "DevVault Backend is running perfectly!" });
});

// Actual API Routes <-- ADD THIS LINE
app.use("/api/dsaLogs", require("./routes/dsaRoutes")); // <-- ADD THIS LINE

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
