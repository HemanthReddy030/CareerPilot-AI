const express = require("express");

const router = express.Router();
const protect = require("../middleware/authMiddleware");

const {
  googleLogin,
  googleCallback,
  googleAuthUrl,
} = require("../controllers/googleController");

// Authentication Route (Unauthenticated)
router.get("/auth", googleAuthUrl);

// Integration Routes (Authenticated)
router.get("/login", protect, googleLogin);

router.get("/callback", googleCallback);

module.exports = router;