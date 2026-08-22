const Job = require("../models/Job");
const User = require("../models/User");

const getAnalytics = async (req, res) => {
  try {
    const jobs = await Job.find({ user: req.user.id }).sort({ createdAt: -1 });

    const totalApplications = jobs.length;
    const pending = jobs.filter((job) => job.status === "Applied").length;
    const interviews = jobs.filter((job) => job.status === "Interview").length;
    const offers = jobs.filter((job) => job.status === "Offer").length;
    const rejected = jobs.filter((job) => job.status === "Rejected").length;

    const statusCounts = {
      Applied: pending,
      Interview: interviews,
      Offer: offers,
      Rejected: rejected,
      Wishlist: jobs.filter((job) => job.status === "Wishlist").length,
    };

    const monthlyApplications = jobs.reduce((acc, job) => {
      const month = job.createdAt.toLocaleString("default", {
        month: "short",
      });
      acc[month] = (acc[month] || 0) + 1;
      return acc;
    }, {});

    const topCompanies = Object.entries(
      jobs.reduce((acc, job) => {
        const name = job.company || "Unknown";
        acc[name] = (acc[name] || 0) + 1;
        return acc;
      }, {})
    )
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([company, count]) => ({ company, count }));

    const interviewsUpcoming = jobs
      .filter((job) => job.status === "Interview")
      .slice(0, 5)
      .map((job) => ({
        id: job._id,
        company: job.company,
        position: job.position,
        location: job.location,
        status: job.status,
        appliedDate: job.appliedDate,
      }));

    const recentApplications = jobs.slice(0, 8).map((job) => ({
      id: job._id,
      company: job.company,
      position: job.position,
      status: job.status,
      appliedDate: job.appliedDate,
      location: job.location,
    }));

    res.status(200).json({
      success: true,
      data: {
        totalApplications,
        pending,
        interviews,
        offers,
        rejected,
        statusCounts,
        monthlyApplications,
        topCompanies,
        interviewsUpcoming,
        recentApplications,
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

const getSettings = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  getAnalytics,
  getSettings,
};