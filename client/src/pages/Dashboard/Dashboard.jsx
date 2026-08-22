import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Lottie } from "lottie-react";

import {
  ArrowRight,
  Briefcase,
  CalendarDays,
  FileText,
  Sparkles,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import DashboardLayout from "../../layouts/DashboardLayout";
import StatsCards from "../../components/dashboard/StatsCards";

function Dashboard() {
  const navigate = useNavigate();

  const [careerAnimation, setCareerAnimation] = useState(null);

  useEffect(() => {
    const loadAnimation = async () => {
      try {
        const response = await fetch(
          "/gifs/career-dashboard.json"
        );

        if (!response.ok) {
          throw new Error(
            "Unable to load career dashboard animation."
          );
        }

        const data = await response.json();

        setCareerAnimation(data);
      } catch (error) {
        console.error(
          "Failed to load career animation:",
          error
        );
      }
    };

    loadAnimation();
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-8">

        {/* HERO */}
        <motion.section
          initial={{
            opacity: 0,
            y: 18,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.55,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="relative overflow-hidden rounded-[32px] border border-blue-100/70 bg-white px-6 py-8 shadow-[0_20px_70px_rgba(15,23,42,0.07)] sm:px-8 lg:px-10"
        >
          {/* BACKGROUND EFFECTS */}
          <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-blue-100/50 blur-3xl" />

          <div className="pointer-events-none absolute -bottom-24 left-[40%] h-64 w-64 rounded-full bg-indigo-100/40 blur-3xl" />

          <div className="relative grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">

            {/* LEFT CONTENT */}
            <div>
              <motion.div
                initial={{
                  opacity: 0,
                  y: 10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.08,
                }}
                className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-blue-600"
              >
                <Sparkles size={14} />

                CareerPilot AI
              </motion.div>

              <motion.h1
                initial={{
                  opacity: 0,
                  y: 14,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.12,
                  duration: 0.5,
                }}
                className="max-w-3xl text-4xl font-bold tracking-[-0.045em] text-slate-950 sm:text-5xl lg:text-[58px] lg:leading-[1.04]"
              >
                Your career journey,

                <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  organized intelligently.
                </span>
              </motion.h1>

              <motion.p
                initial={{
                  opacity: 0,
                  y: 14,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.18,
                  duration: 0.5,
                }}
                className="mt-6 max-w-2xl text-base leading-8 text-slate-500 sm:text-lg"
              >
                Track applications, prepare for interviews,
                manage your resume, and keep every opportunity
                in one intelligent workspace.
              </motion.p>

              {/* ACTION BUTTONS */}
              <motion.div
                initial={{
                  opacity: 0,
                  y: 14,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.24,
                  duration: 0.5,
                }}
                className="mt-8 flex flex-wrap gap-3"
              >
                <button
                  type="button"
                  onClick={() =>
                    navigate("/jobs")
                  }
                  className="cp-btn cp-btn-primary px-5 py-3"
                >
                  <Briefcase size={18} />

                  View Applications

                  <ArrowRight size={17} />
                </button>

                <button
                  type="button"
                  onClick={() =>
                    navigate("/ai-interview")
                  }
                  className="cp-btn cp-btn-secondary px-5 py-3"
                >
                  <Sparkles size={18} />

                  Practice Interview
                </button>
              </motion.div>
            </div>

            {/* RIGHT LOTTIE ANIMATION */}
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
                delay: 0.16,
                duration: 0.65,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative mx-auto w-full max-w-[470px]"
            >
              <div className="cp-image-shell relative overflow-hidden p-5 sm:p-6">

                {/* FLOATING ICON */}
                <motion.div
                  animate={{
                    y: [0, -5, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute left-5 top-5 z-20 rounded-2xl border border-white/90 bg-white/95 p-3 shadow-lg backdrop-blur"
                >
                  <Briefcase
                    className="text-blue-600"
                    size={20}
                  />
                </motion.div>

                {/* FLOATING ICON */}
                <motion.div
                  animate={{
                    y: [0, 5, 0],
                  }}
                  transition={{
                    duration: 4.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute right-5 top-14 z-20 rounded-2xl border border-white/90 bg-white/95 p-3 shadow-lg backdrop-blur"
                >
                  <CalendarDays
                    className="text-indigo-600"
                    size={20}
                  />
                </motion.div>

                {/* FLOATING ICON */}
                <motion.div
                  animate={{
                    y: [0, -4, 0],
                  }}
                  transition={{
                    duration: 4.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute bottom-7 left-8 z-20 rounded-2xl border border-white/90 bg-white/95 p-3 shadow-lg backdrop-blur"
                >
                  <FileText
                    className="text-emerald-600"
                    size={20}
                  />
                </motion.div>

                {/* LOTTIE WRAPPER */}
                <motion.div
                  animate={{
                    y: [0, -5, 0],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="relative flex min-h-[350px] items-center justify-center overflow-hidden rounded-[32px] border border-blue-100 bg-gradient-to-br from-blue-50/70 via-white to-indigo-50/70 sm:min-h-[400px]"
                >
                  <div className="pointer-events-none absolute inset-0">

                    <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-100/45 blur-3xl" />

                  </div>

                  {careerAnimation ? (
                    <motion.div
                      initial={{
                        opacity: 0,
                        scale: 0.92,
                      }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                      }}
                      transition={{
                        duration: 0.6,
                      }}
                      className="relative z-10 flex h-full w-full items-center justify-center"
                    >
                      <Lottie
                        src={
                          careerAnimation
                        }
                        loop={true}
                        autoplay={true}
                        rendererSettings={{
                          preserveAspectRatio:
                            "xMidYMid meet",
                        }}
                        className="h-[310px] w-full max-w-[390px] sm:h-[360px]"
                      />
                    </motion.div>
                  ) : (
                    <div className="relative z-10 flex flex-col items-center justify-center text-center">

                      <div className="cp-ai-orb">
                        <Sparkles
                          size={24}
                          className="text-blue-600"
                        />
                      </div>

                      <p className="mt-5 text-sm font-semibold text-slate-700">
                        Loading career workspace
                      </p>

                      <div className="mt-3 cp-thinking-dots">
                        <span />
                        <span />
                        <span />
                      </div>

                    </div>
                  )}

                </motion.div>
              </div>
            </motion.div>

          </div>
        </motion.section>

        {/* APPLICATION PERFORMANCE */}
        <motion.section
          initial={{
            opacity: 0,
            y: 18,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.2,
            duration: 0.55,
          }}
        >
          <div className="mb-5 flex items-end justify-between gap-4">

            <div>
              <p className="cp-eyebrow">
                Overview
              </p>

              <h2 className="mt-2 text-2xl font-bold tracking-[-0.035em] text-slate-950">
                Application performance
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                A quick view of your current job search
                progress.
              </p>
            </div>

          </div>

          <StatsCards />
        </motion.section>

      </div>
    </DashboardLayout>
  );
}

export default Dashboard;