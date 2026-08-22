const express = require("express");

const router = express.Router();

const {
  generateQuestion,
  evaluateAnswer,
} = require("../controllers/interviewController");

const protect = require("../middleware/authMiddleware");

router.post("/generate-question", generateQuestion);

router.post("/evaluate-answer", evaluateAnswer);

router.post("/generate", protect, generateQuestion);

router.post("/evaluate", protect, evaluateAnswer);

module.exports = router;