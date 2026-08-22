const express = require("express");

const router = express.Router();

const {
  getJobEmails,
} = require("../controllers/gmailController");

const protect = require("../middleware/authMiddleware");

router.get("/emails", protect, getJobEmails);

module.exports = router;