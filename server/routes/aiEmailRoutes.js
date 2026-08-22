const express = require("express");

const router = express.Router();

const {
  extractInterviewDetails,
} = require("../controllers/aiEmailController");

router.post("/extract", extractInterviewDetails);

module.exports = router;