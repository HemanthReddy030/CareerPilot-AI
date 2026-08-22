import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../config/api";
import { motion } from "framer-motion";
import {
  FaBriefcase,
  FaUserTie,
  FaCheckCircle,
  FaTimesCircle,
  FaHeart,
  FaChartLine,
} from "react-icons/fa";

function StatsCards() {
  const [stats, setStats] = useState({
    totalApplications: 0,
    interviews: 0,
    offers: 0,
    rejected: 0,
    wishlist: 0,
    successRate: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `${API_URL}/jobs/stats`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setStats(res.data.stats);
    } catch (err) {
      console.error("Failed to load dashboard stats", err);
    }
  };

  const cards = [
    {
      title: "Applications",
      value: stats.totalApplications,
      icon: <FaBriefcase />,
      subtitle: "Total tracked jobs",
      tone: "blue",
    },
    {
      title: "Interviews",
      value: stats.interviews,
      icon: <FaUserTie />,
      subtitle: "Interview opportunities",
      tone: "amber",
    },
    {
      title: "Offers",
      value: stats.offers,
      icon: <FaCheckCircle />,
      subtitle: "Offers received",
      tone: "emerald",
    },
    {
      title: "Rejected",
      value: stats.rejected,
      icon: <FaTimesCircle />,
      subtitle: "Closed applications",
      tone: "rose",
    },
    {
      title: "Wishlist",
      value: stats.wishlist,
      icon: <FaHeart />,
      subtitle: "Roles saved for later",
      tone: "violet",
    },
    {
      title: "Success Rate",
      value: `${stats.successRate}%`,
      icon: <FaChartLine />,
      subtitle: "Application success",
      tone: "indigo",
    },
  ];

  const toneStyles = {
    blue: {
      icon: "bg-blue-50 text-blue-600 ring-blue-100",
      glow: "bg-blue-200/25",
      line: "from-blue-500 to-sky-400",
    },
    amber: {
      icon: "bg-amber-50 text-amber-600 ring-amber-100",
      glow: "bg-amber-200/25",
      line: "from-amber-500 to-orange-400",
    },
    emerald: {
      icon: "bg-emerald-50 text-emerald-600 ring-emerald-100",
      glow: "bg-emerald-200/25",
      line: "from-emerald-500 to-teal-400",
    },
    rose: {
      icon: "bg-rose-50 text-rose-600 ring-rose-100",
      glow: "bg-rose-200/25",
      line: "from-rose-500 to-red-400",
    },
    violet: {
      icon: "bg-violet-50 text-violet-600 ring-violet-100",
      glow: "bg-violet-200/25",
      line: "from-violet-500 to-purple-400",
    },
    indigo: {
      icon: "bg-indigo-50 text-indigo-600 ring-indigo-100",
      glow: "bg-indigo-200/25",
      line: "from-indigo-500 to-blue-500",
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.07,
          },
        },
      }}
      className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3"
    >
      {cards.map((card) => {
        const styles = toneStyles[card.tone];

        return (
          <motion.div
            key={card.title}
            variants={{
              hidden: {
                opacity: 0,
                y: 14,
                scale: 0.985,
              },
              visible: {
                opacity: 1,
                y: 0,
                scale: 1,
                transition: {
                  duration: 0.45,
                  ease: [0.16, 1, 0.3, 1],
                },
              },
            }}
            whileHover={{
              y: -3,
              transition: {
                duration: 0.2,
              },
            }}
            className="group relative overflow-hidden rounded-[26px] border border-slate-200/80 bg-white p-6 shadow-[0_12px_40px_rgba(15,23,42,0.055)] transition-shadow duration-300 hover:shadow-[0_22px_60px_rgba(15,23,42,0.09)]"
          >
            <div
              className={`pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full ${styles.glow} blur-3xl transition-transform duration-500 group-hover:scale-125`}
            />

            <div className="relative flex items-start justify-between gap-5">
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                  {card.title}
                </p>

                <motion.h2
                  key={card.value}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-3 text-4xl font-bold tracking-[-0.04em] text-slate-950"
                >
                  {card.value}
                </motion.h2>

                <p className="mt-2 text-sm text-slate-500">
                  {card.subtitle}
                </p>
              </div>

              <div
                className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-xl shadow-sm ring-1 ${styles.icon}`}
              >
                {card.icon}
              </div>
            </div>

            <div className="relative mt-6 h-1.5 overflow-hidden rounded-full bg-slate-100">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "72%" }}
                transition={{
                  duration: 0.8,
                  delay: 0.15,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`h-full rounded-full bg-gradient-to-r ${styles.line}`}
              />
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

export default StatsCards;