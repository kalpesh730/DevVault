const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db"); // <-- ADD THIS LINE

// Connect to Database
connectDB(); // <-- ADD THIS LINE

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.status(200).json({ message: "DevVault Backend is running perfectly!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
