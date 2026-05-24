const express = require("express");
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize the AI with your secure key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post("/analyze", async (req, res) => {
  try {
    const { code, title } = req.body;

    if (!code) {
      return res
        .status(400)
        .json({ message: "No code provided for analysis." });
    }

    // Target the specific model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // The Master Prompt (Engineering the AI's behavior)
    const prompt = `
      Act as a Senior FAANG Software Engineer. 
      Review this Java solution for the algorithm: "${title}".
      
      Code:
      ${code}
      
      Provide a highly concise, professional code review formatted EXACTLY like this:
      TIME COMPLEXITY: [O(...) with 1 sentence explanation]
      SPACE COMPLEXITY: [O(...) with 1 sentence explanation]
      OPTIMIZATION: [1-2 sentences on how to write it better or cleaner]
      
      Do not use markdown bolding or formatting, just plain text in those three lines.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const aiText = response.text();

    res.status(200).json({ analysis: aiText });
  } catch (error) {
    console.error("AI Core Error:", error);
    res.status(500).json({ message: "AI processing failed." });
  }
});

module.exports = router;
