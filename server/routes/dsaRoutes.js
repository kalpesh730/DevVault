const express = require("express");
const router = express.Router();
const DsaLog = require("../models/DsaLog"); // Importing our blueprint

// @route   POST /api/dsaLogs
// @desc    Save a new Java DSA practice log
router.post("/", async (req, res) => {
  try {
    const { title, topic, difficulty, solutionCode } = req.body;

    const newLog = new DsaLog({
      title,
      topic,
      difficulty,
      solutionCode,
    });

    const savedLog = await newLog.save();
    res.status(201).json(savedLog);
  } catch (error) {
    res.status(500).json({ message: "Server Error: Could not save log." });
  }
});

// @route   GET /api/dsaLogs
// @desc    Get all practice logs for the dashboard
router.get("/", async (req, res) => {
  try {
    const logs = await DsaLog.find().sort({ date: -1 }); // Newest first
    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ message: "Server Error: Could not fetch logs." });
  }
});

module.exports = router;
