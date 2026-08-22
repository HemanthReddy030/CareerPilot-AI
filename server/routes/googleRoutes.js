const express = require("express");

const router = express.Router();
const protect = require("../middleware/authMiddleware");

const {
  googleLogin,
  googleCallback,
} = require("../controllers/googleController");

router.get("/login", protect, googleLogin);

router.get("/callback", googleCallback);

module.exports = router;