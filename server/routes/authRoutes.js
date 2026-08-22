const express = require("express");

const router = express.Router();

const {
  registerUser,
  loginUser,
  socialLogin,
  getProfile,
  verifyEmail,
  resendVerification,
} = require("../controllers/authController");

const authMiddleware = require("../middleware/authMiddleware");

// ===============================
// Authentication Routes
// ===============================

// Register
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

// Social Login (Google / Apple)
router.post("/social-login", socialLogin);

// Verify Email
router.get("/verify-email/:token", verifyEmail);

// Resend Verification
router.post("/resend-verification", resendVerification);

// Get Logged In User Profile
router.get("/profile", authMiddleware, getProfile);

module.exports = router;