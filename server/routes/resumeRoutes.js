const express = require("express");

const router = express.Router();

const upload = require("../middleware/uploadMiddleware");
const protect = require("../middleware/authMiddleware");

const {
  uploadResume,
  getResumes,
  deleteResume,
} = require("../controllers/resumeController");

// Upload Resume
router.post(
  "/upload",
  protect,
  upload.single("resume"),
  uploadResume
);

// Get All Resumes
router.get("/", protect, getResumes);

// Delete Resume
router.delete("/:id", protect, deleteResume);

module.exports = router;