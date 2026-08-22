import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

import {
  Briefcase,
  Clock3,
  CalendarDays,
  CheckCircle2,
  XCircle,
  Trophy,
  Building2,
  TrendingUp,
  BarChart3,
  Sparkles,
  Activity,
  Target,
} from "lucide-react";

import DashboardLayout from "../../layouts/DashboardLayout";
import { getAnalytics } from "../../services/analyticsService";

const COLORS = [
  "#2563EB",
  "#F59E0B",
  "#22C55E",
  "#EF4444",
  "#7C3AED",
];

function Analytics() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      setLoading(true);

      const data = await getAnalytics();

      setAnalytics(data.analytics);
    } catch (error) {
      console.error(error);
      alert("Failed to load analytics.");
    } finally {
      setLoading(false);
    }
  };

  const cards = useMemo(() => {
    if (!analytics) return [];

    return [
      {
        title: "Total Applications",
        value: analytics.totalApplications,
        icon: Briefcase,
        style: "bg-blue-50 text-blue-600 ring-blue-100",
      },
      {
        title: "Applied",
        value: analytics.applied,
        icon: Clock3,
        style: "bg-amber-50 text-amber-600 ring-amber-100",
      },
      {
        title: "Interviews",
        value: analytics.interviews,
        icon: CalendarDays,
        style: "bg-violet-50 text-violet-600 ring-violet-100",
      },
      {
        title: "Offers",
        value: analytics.offers,
        icon: Trophy,
        style: "bg-emerald-50 text-emerald-600 ring-emerald-100",
      },
      {
        title: "Rejected",
        value: analytics.rejected,
        icon: XCircle,
        style: "bg-rose-50 text-rose-600 ring-rose-100",
      },
      {
        title: "Success Rate",
        value: `${analytics.successRate}%`,
        icon: TrendingUp,
        style: "bg-cyan-50 text-cyan-600 ring-cyan-100",
      },
    ];
  }, [analytics]);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex min-h-[70vh] items-center justify-center">
          <div className="text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "linear",
              }}
              className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-blue-100 bg-blue-50 text-blue-600"
            >
              <BarChart3 size={27} />
            </motion.div>

            <h2 className="mt-5 text-lg font-bold text-slate-900">
              Loading Analytics
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Preparing your application insights...
            </p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!analytics) {
    return (
      <DashboardLayout>
        <div className="flex min-h-[70vh] items-center justify-center">
          <div className="text-center">
            <BarChart3
              size={42}
              className="mx-auto text-slate-300"
            />

            <h2 className="mt-4 text-xl font-bold text-slate-900">
              Analytics unavailable
            </h2>

            <p className="mt-2 text-slate-500">
              Unable to display your application analytics.
            </p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">

        {/* HERO */}
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.55,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="relative overflow-hidden rounded-[32px] border border-blue-100/80 bg-white p-7 shadow-[0_20px_70px_rgba(15,23,42,0.06)] sm:p-8 lg:p-10"
        >
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-blue-100/50 blur-3xl" />

          <div className="pointer-events-none absolute -bottom-28 left-[35%] h-72 w-72 rounded-full bg-indigo-100/40 blur-3xl" />

          <div className="relative grid items-center gap-10 xl:grid-cols-[1.15fr_0.85fr]">

            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-blue-600">
                <Activity size={14} />
                Career Analytics
              </div>

              <h1 className="mt-5 max-w-3xl text-4xl font-bold tracking-[-0.045em] text-slate-950 sm:text-5xl">
                Understand your job search
                <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  at a glance.
                </span>
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-8 text-slate-500">
                Track applications, interviews, offers, companies and
                monthly activity from one intelligent career dashboard.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <div className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm">
                  <Briefcase size={17} className="text-blue-600" />
                  {analytics.totalApplications} Applications
                </div>

                <div className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm">
                  <CalendarDays size={17} className="text-violet-600" />
                  {analytics.interviews} Interviews
                </div>

                <div className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm">
                  <TrendingUp size={17} className="text-emerald-600" />
                  {analytics.successRate}% Success
                </div>
              </div>
            </div>

            {/* VISUAL */}
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.96,
                x: 18,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                x: 0,
              }}
              transition={{
                delay: 0.15,
                duration: 0.65,
              }}
              className="relative mx-auto w-full max-w-[430px]"
            >
              <div className="relative overflow-hidden rounded-[30px] border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-7">

                <motion.div
                  animate={{
                    y: [0, -6, 0],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="rounded-[25px] border border-white bg-white p-6 shadow-[0_24px_60px_rgba(37,99,235,0.12)]"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                        Career Performance
                      </p>

                      <h3 className="mt-2 text-3xl font-bold text-slate-950">
                        {analytics.successRate}%
                      </h3>
                    </div>

                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                      <TrendingUp size={22} />
                    </div>
                  </div>

                  <div className="mt-7 flex h-28 items-end gap-3">
                    {[42, 65, 52, 78, 62, 90, 74].map(
                      (height, index) => (
                        <motion.div
                          key={index}
                          initial={{ height: 0 }}
                          animate={{
                            height: `${height}%`,
                          }}
                          transition={{
                            delay: 0.25 + index * 0.07,
                            duration: 0.6,
                          }}
                          className="flex-1 rounded-t-lg bg-gradient-to-t from-blue-600 to-indigo-400"
                        />
                      )
                    )}
                  </div>
                </motion.div>

                <motion.div
                  animate={{
                    y: [0, -5, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-blue-600 shadow-lg"
                >
                  <Sparkles size={19} />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* SUMMARY CARDS */}
        <section>
          <div className="mb-5">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600">
              Overview
            </p>

            <h2 className="mt-2 text-2xl font-bold tracking-[-0.03em] text-slate-950">
              Application Performance
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {cards.map((card, index) => {
              const Icon = card.icon;

              return (
                <motion.div
                  key={card.title}
                  initial={{
                    opacity: 0,
                    y: 14,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: index * 0.05,
                  }}
                  whileHover={{
                    y: -4,
                  }}
                  className="group rounded-[25px] border border-slate-200/80 bg-white p-6 shadow-[0_12px_40px_rgba(15,23,42,0.045)] transition-shadow duration-300 hover:shadow-[0_20px_50px_rgba(15,23,42,0.08)]"
                >
                  <div className="flex items-center justify-between">

                    <div>
                      <p className="text-sm font-medium text-slate-500">
                        {card.title}
                      </p>

                      <h3 className="mt-3 text-4xl font-bold tracking-tight text-slate-950">
                        {card.value}
                      </h3>
                    </div>

                    <div
                      className={`flex h-14 w-14 items-center justify-center rounded-2xl ring-1 ${card.style}`}
                    >
                      <Icon size={24} />
                    </div>

                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* CHARTS */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

          {/* PIE */}
          <motion.section
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-[28px] border border-slate-200/80 bg-white p-6 shadow-[0_16px_50px_rgba(15,23,42,0.05)] sm:p-8"
          >
            <div className="mb-5">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600">
                Pipeline
              </p>

              <h2 className="mt-2 text-2xl font-bold text-slate-950">
                Applications by Status
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Distribution of your current job application pipeline.
              </p>
            </div>

            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={analytics.statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={115}
                  paddingAngle={4}
                  dataKey="value"
                  label
                >
                  {analytics.statusData.map(
                    (entry, index) => (
                      <Cell
                        key={index}
                        fill={
                          COLORS[
                          index %
                          COLORS.length
                          ]
                        }
                      />
                    )
                  )}
                </Pie>

                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </motion.section>

          {/* MONTHLY */}
          <motion.section
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.07 }}
            className="rounded-[28px] border border-slate-200/80 bg-white p-6 shadow-[0_16px_50px_rgba(15,23,42,0.05)] sm:p-8"
          >
            <div className="mb-5">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600">
                Activity
              </p>

              <h2 className="mt-2 text-2xl font-bold text-slate-950">
                Monthly Applications
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                See how consistently you are applying over time.
              </p>
            </div>

            <ResponsiveContainer width="100%" height={350}>
              <BarChart
                data={
                  analytics.monthlyApplications
                }
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#E2E8F0"
                />

                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                />

                <Tooltip />

                <Bar
                  dataKey="applications"
                  radius={[10, 10, 0, 0]}
                  fill="#2563EB"
                />
              </BarChart>
            </ResponsiveContainer>
          </motion.section>
        </div>

        {/* COMPANIES + INTERVIEWS */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

          {/* TOP COMPANIES */}
          <section className="rounded-[28px] border border-slate-200/80 bg-white p-6 shadow-[0_16px_50px_rgba(15,23,42,0.05)] sm:p-8">

            <div className="mb-6">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600">
                Companies
              </p>

              <h2 className="mt-2 text-2xl font-bold text-slate-950">
                Top Companies
              </h2>
            </div>

            <div className="space-y-3">
              {analytics.topCompanies.length ===
                0 ? (
                <div className="py-12 text-center">
                  <Building2
                    size={38}
                    className="mx-auto text-slate-300"
                  />

                  <p className="mt-3 text-sm text-slate-500">
                    No companies available.
                  </p>
                </div>
              ) : (
                analytics.topCompanies.map(
                  (company, index) => (
                    <motion.div
                      key={company.company}
                      initial={{
                        opacity: 0,
                        x: -8,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      transition={{
                        delay: index * 0.05,
                      }}
                      whileHover={{
                        x: 3,
                      }}
                      className="flex items-center justify-between rounded-[20px] border border-slate-100 bg-slate-50/70 p-4 transition-colors hover:bg-blue-50/50"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-blue-600 shadow-sm ring-1 ring-blue-100">
                          <Building2 size={19} />
                        </div>

                        <div>
                          <h3 className="font-bold capitalize text-slate-900">
                            {company.company}
                          </h3>

                          <p className="mt-1 text-xs text-slate-500">
                            Applications
                          </p>
                        </div>
                      </div>

                      <div className="flex h-10 min-w-10 items-center justify-center rounded-xl bg-blue-600 px-3 font-bold text-white shadow-sm">
                        {company.count}
                      </div>
                    </motion.div>
                  )
                )
              )}
            </div>
          </section>

          {/* UPCOMING */}
          <section className="rounded-[28px] border border-slate-200/80 bg-white p-6 shadow-[0_16px_50px_rgba(15,23,42,0.05)] sm:p-8">

            <div className="mb-6">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-violet-600">
                Schedule
              </p>

              <h2 className="mt-2 text-2xl font-bold text-slate-950">
                Upcoming Interviews
              </h2>
            </div>

            <div className="space-y-4">
              {analytics.upcomingInterviews
                .length === 0 ? (
                <div className="flex min-h-[240px] flex-col items-center justify-center rounded-[22px] border border-dashed border-slate-200 bg-slate-50/60 text-center">
                  <CalendarDays
                    size={42}
                    className="text-slate-300"
                  />

                  <p className="mt-4 font-semibold text-slate-700">
                    No interviews scheduled
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    Upcoming interviews will appear here.
                  </p>
                </div>
              ) : (
                analytics.upcomingInterviews.map(
                  (job, index) => (
                    <motion.div
                      key={job._id}
                      initial={{
                        opacity: 0,
                        y: 8,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        delay: index * 0.05,
                      }}
                      className="rounded-[20px] border border-slate-200/80 p-5 transition-shadow hover:shadow-md"
                    >
                      <div className="flex justify-between gap-4">
                        <div>
                          <h3 className="text-lg font-bold capitalize text-slate-900">
                            {job.company}
                          </h3>

                          <p className="mt-1 text-sm text-slate-500">
                            {job.position}
                          </p>
                        </div>

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100">
                          <CheckCircle2
                            size={18}
                          />
                        </div>
                      </div>

                      <div className="mt-4 inline-flex items-center gap-2 rounded-xl bg-violet-50 px-3 py-2 text-xs font-semibold text-violet-700">
                        <CalendarDays
                          size={13}
                        />

                        {job.interviewDate
                          ? new Date(
                            job.interviewDate
                          ).toLocaleDateString()
                          : "Date not available"}
                      </div>
                    </motion.div>
                  )
                )
              )}
            </div>
          </section>
        </div>

        {/* RECENT APPLICATIONS */}
        <section className="overflow-hidden rounded-[28px] border border-slate-200/80 bg-white shadow-[0_16px_50px_rgba(15,23,42,0.05)]">

          <div className="border-b border-slate-100 p-6 sm:p-8">
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 ring-1 ring-blue-100">
                <Target size={19} />
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600">
                  Latest Activity
                </p>

                <h2 className="mt-1 text-2xl font-bold text-slate-950">
                  Recent Applications
                </h2>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">

              <thead className="bg-slate-50/80">
                <tr>
                  <th className="px-7 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                    Company
                  </th>

                  <th className="px-7 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                    Position
                  </th>

                  <th className="px-7 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                    Status
                  </th>

                  <th className="px-7 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                    Applied Date
                  </th>
                </tr>
              </thead>

              <tbody>
                {analytics.recentApplications
                  .length === 0 ? (
                  <tr>
                    <td
                      colSpan="4"
                      className="py-14 text-center text-sm text-slate-500"
                    >
                      No applications found.
                    </td>
                  </tr>
                ) : (
                  analytics.recentApplications.map(
                    (job) => (
                      <tr
                        key={job._id}
                        className="border-t border-slate-100 transition-colors hover:bg-slate-50/70"
                      >
                        <td className="px-7 py-5 font-bold capitalize text-slate-900">
                          {job.company}
                        </td>

                        <td className="px-7 py-5 text-sm text-slate-600">
                          {job.position}
                        </td>

                        <td className="px-7 py-5">
                          <span
                            className={`inline-flex rounded-full px-3 py-1.5 text-xs font-bold ${job.status ===
                                "Applied"
                                ? "bg-blue-50 text-blue-700"
                                : job.status ===
                                  "Interview"
                                  ? "bg-amber-50 text-amber-700"
                                  : job.status ===
                                    "Offer"
                                    ? "bg-emerald-50 text-emerald-700"
                                    : job.status ===
                                      "Rejected"
                                      ? "bg-rose-50 text-rose-700"
                                      : "bg-slate-100 text-slate-700"
                              }`}
                          >
                            {job.status}
                          </span>
                        </td>

                        <td className="px-7 py-5 text-sm text-slate-500">
                          {job.appliedDate
                            ? new Date(
                              job.appliedDate
                            ).toLocaleDateString()
                            : "Not Available"}
                        </td>
                      </tr>
                    )
                  )
                )}
              </tbody>
            </table>
          </div>
        </section>

      </div>
    </DashboardLayout>
  );
}

export default Analytics;