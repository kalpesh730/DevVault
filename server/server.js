// 1. Import dependencies
const express = require("express");
const cors = require("cors");
require("dotenv").config();

// 2. Initialize the Express app
const app = express();

// 3. Apply middleware
app.use(cors());
app.use(express.json());

// 4. Create a test route (Health Check)
app.get("/api/health", (req, res) => {
  res.status(200).json({ message: "DevVault Backend is running perfectly!" });
});

// 5. Start the engine
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
