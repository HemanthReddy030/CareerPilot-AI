const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  createJob,
  getJobs,
  getJobById,
  updateJob,
  deleteJob,
  getDashboardStats,
} = require("../controllers/jobController");

// ==========================
// Dashboard Statistics
// ==========================
router.get("/stats", authMiddleware, getDashboardStats);

// ==========================
// Job CRUD
// ==========================
router.post("/", authMiddleware, createJob);

router.get("/", authMiddleware, getJobs);

router.get("/:id", authMiddleware, getJobById);

router.put("/:id", authMiddleware, updateJob);

router.delete("/:id", authMiddleware, deleteJob);

module.exports = router;