const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const {
  getAnalytics,
  getSettings,
} = require("../controllers/settingsController");
const {
  updateProfile,
  changePassword,
  disconnectGoogle,
  deleteAccount,
} = require("../controllers/authController");

router.get("/analytics", authMiddleware, getAnalytics);
router.get("/settings", authMiddleware, getSettings);
router.put("/profile", authMiddleware, updateProfile);
router.put("/password", authMiddleware, changePassword);
router.post("/google/disconnect", authMiddleware, disconnectGoogle);
router.delete("/account", authMiddleware, deleteAccount);

module.exports = router;
