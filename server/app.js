const express = require("express");
const cors = require("cors");
const analyticsRoutes = require("./routes/analyticsRoutes");
const authRoutes = require("./routes/authRoutes");
const resumeRoutes = require("./routes/resumeRoutes");
const jobRoutes = require("./routes/jobRoutes");
const interviewRoutes = require("./routes/interviewRoutes");
const googleRoutes = require("./routes/googleRoutes");
const gmailRoutes = require("./routes/gmailRoutes");
const calendarRoutes = require("./routes/calendarRoutes");
const aiEmailRoutes = require("./routes/aiEmailRoutes");
const settingsRoutes = require("./routes/settingsRoutes");
const companyRoutes = require("./routes/companyRoutes");

const app = express();

// ======================
// Middleware
// ======================

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// ======================
// Static Folder
// ======================

app.use("/uploads", express.static("uploads"));

// ======================
// API Routes
// ======================

app.use("/api/auth", authRoutes);

app.use("/api/resume", resumeRoutes);

app.use("/api/analytics", analyticsRoutes);

app.use("/api/jobs", jobRoutes);

app.use("/api/interview", interviewRoutes);

app.use("/api/google", googleRoutes);

app.use("/api/company", companyRoutes);

app.use("/api/gmail", gmailRoutes);

app.use("/api/calendar", calendarRoutes);
app.use("/api/ai-email", aiEmailRoutes);
app.use("/api/settings", settingsRoutes);

// ======================
// Home Route
// ======================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "CareerPilot AI Server Running 🚀",
  });
});

module.exports = app;