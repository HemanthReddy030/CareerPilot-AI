const express = require("express");

const router = express.Router();
const protect = require("../middleware/authMiddleware");

const {
  createCalendarEvent,
} = require("../controllers/calendarController");

router.post("/create", protect, createCalendarEvent);

module.exports = router;