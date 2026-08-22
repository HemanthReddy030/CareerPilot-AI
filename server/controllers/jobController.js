const Job = require("../models/Job");

// ==========================================
// Create Job
// ==========================================
exports.createJob = async (req, res) => {
  try {
    const {
      company,
      position,
      location,
      jobType,
      salary,
      status,
      notes,
    } = req.body;

    const job = await Job.create({
      user: req.user.id,
      company,
      position,
      location,
      jobType,
      salary,
      status,
      notes,
    });

    res.status(201).json({
      success: true,
      message: "Job created successfully",
      job,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ==========================================
// Get Dashboard Statistics
// ==========================================
exports.getDashboardStats = async (req, res) => {
  try {
    const jobs = await Job.find({ user: req.user.id });

    const totalApplications = jobs.length;

    const interviews = jobs.filter(
      (job) => job.status === "Interview"
    ).length;

    const offers = jobs.filter(
      (job) => job.status === "Offer"
    ).length;

    const rejected = jobs.filter(
      (job) => job.status === "Rejected"
    ).length;

    const wishlist = jobs.filter(
      (job) => job.status === "Wishlist"
    ).length;

    const successRate =
      totalApplications === 0
        ? 0
        : Math.round((offers / totalApplications) * 100);

    res.status(200).json({
      success: true,
      stats: {
        totalApplications,
        interviews,
        offers,
        rejected,
        wishlist,
        successRate,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ==========================================
// Get All Jobs
// ==========================================
exports.getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({
      user: req.user.id,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: jobs.length,
      jobs,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ==========================================
// Get Single Job
// ==========================================
exports.getJobById = async (req, res) => {
  try {
    const job = await Job.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    res.status(200).json({
      success: true,
      job,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ==========================================
// Update Job
// ==========================================
exports.updateJob = async (req, res) => {
  try {
    const job = await Job.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.id,
      },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Job updated successfully",
      job,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ==========================================
// Delete Job
// ==========================================
exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    await job.deleteOne();

    res.status(200).json({
      success: true,
      message: "Job deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};