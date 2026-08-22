const Job = require("../models/Job");

const getAnalytics = async (req, res) => {
    try {
        const userId = req.user._id;

        const jobs = await Job.find({ user: userId }).sort({
            createdAt: -1,
        });

        const totalApplications = jobs.length;

        const applied = jobs.filter(
            (job) => job.status === "Applied"
        ).length;

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

        // -------------------------------
        // Monthly Applications
        // -------------------------------

        const monthlyMap = {};

        jobs.forEach((job) => {
            const month = new Date(job.appliedDate).toLocaleString(
                "default",
                {
                    month: "short",
                }
            );

            monthlyMap[month] =
                (monthlyMap[month] || 0) + 1;
        });

        const monthlyApplications = Object.keys(
            monthlyMap
        ).map((month) => ({
            month,
            applications: monthlyMap[month],
        }));

        // -------------------------------
        // Status Distribution
        // -------------------------------

        const statusData = [
            {
                name: "Applied",
                value: applied,
            },
            {
                name: "Interview",
                value: interviews,
            },
            {
                name: "Offer",
                value: offers,
            },
            {
                name: "Rejected",
                value: rejected,
            },
            {
                name: "Wishlist",
                value: wishlist,
            },
        ];

        // -------------------------------
        // Top Companies
        // -------------------------------

        const companyMap = {};

        jobs.forEach((job) => {
            companyMap[job.company] =
                (companyMap[job.company] || 0) + 1;
        });

        const topCompanies = Object.entries(
            companyMap
        )
            .map(([company, count]) => ({
                company,
                count,
            }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 5);

        // -------------------------------
        // Upcoming Interviews
        // -------------------------------

        const upcomingInterviews = jobs
            .filter(
                (job) =>
                    job.status === "Interview" &&
                    job.interviewDate
            )
            .sort(
                (a, b) =>
                    new Date(a.interviewDate) -
                    new Date(b.interviewDate)
            );

        // -------------------------------
        // Success Rate
        // -------------------------------

        const successRate =
            totalApplications === 0
                ? 0
                : (
                    (offers / totalApplications) *
                    100
                ).toFixed(2);

        res.status(200).json({
            success: true,

            analytics: {
                totalApplications,

                applied,

                interviews,

                offers,

                rejected,

                wishlist,

                successRate,

                statusData,

                monthlyApplications,

                topCompanies,

                upcomingInterviews,

                recentApplications: jobs.slice(0, 5),
            },
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to load analytics.",
        });
    }
};

module.exports = {
    getAnalytics,
};