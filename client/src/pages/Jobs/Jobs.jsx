import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Lottie } from "lottie-react";
import {
  PlusCircle,
  Layers,
  Briefcase,
  ArrowRight,
  Sparkles,
  SearchCheck,
  Building2,
} from "lucide-react";

import DashboardLayout from "../../layouts/DashboardLayout";
import JobForm from "../../components/jobs/JobForm";
import JobList from "../../components/jobs/JobList";

function Jobs() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [jobSearchAnimation, setJobSearchAnimation] = useState(null);

  useEffect(() => {
    const loadAnimation = async () => {
      try {
        const response = await fetch("/gifs/job-search.json");
        if (!response.ok) {
          throw new Error("Unable to load job search animation.");
        }
        const data = await response.json();
        setJobSearchAnimation(data);
      } catch (error) {
        console.error("Failed to load job search animation:", error);
      }
    };
    loadAnimation();
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-8">

        {/* Hero */}
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.55,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="relative overflow-hidden rounded-[32px] border border-blue-100/80 bg-white p-7 shadow-[0_20px_70px_rgba(15,23,42,0.06)] sm:p-8 lg:p-10"
        >
          <div className="pointer-events-none absolute -right-24 -top-28 h-80 w-80 rounded-full bg-blue-100/45 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-28 left-[35%] h-72 w-72 rounded-full bg-indigo-100/35 blur-3xl" />

          <div className="relative grid items-center gap-10 xl:grid-cols-[1.12fr_0.88fr]">

            <div>
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 }}
                className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-blue-600"
              >
                <Briefcase size={14} />
                Job Tracker
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.12,
                  duration: 0.5,
                }}
                className="mt-5 max-w-3xl text-4xl font-bold tracking-[-0.045em] text-slate-950 sm:text-5xl"
              >
                Manage every opportunity
                <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  from one place.
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.17,
                  duration: 0.5,
                }}
                className="mt-5 max-w-2xl text-base leading-8 text-slate-500"
              >
                Add new applications, track progress, explore company insights,
                and keep your career pipeline organized.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.22,
                  duration: 0.5,
                }}
                className="mt-7 flex flex-wrap gap-3"
              >
                <div className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm">
                  <Layers size={17} className="text-blue-600" />
                  Application Pipeline
                </div>

                <div className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm">
                  <Building2 size={17} className="text-indigo-600" />
                  Company Insights
                </div>

                <div className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm">
                  <SearchCheck size={17} className="text-emerald-600" />
                  Smart Tracking
                </div>
              </motion.div>
            </div>

            {/* Illustration/GIF area */}
            <motion.div
              initial={{
                opacity: 0,
                x: 18,
                scale: 0.97,
              }}
              animate={{
                opacity: 1,
                x: 0,
                scale: 1,
              }}
              transition={{
                delay: 0.15,
                duration: 0.65,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative mx-auto w-full max-w-[450px]"
            >
              <div className="cp-image-shell relative overflow-hidden p-6">

                <motion.div
                  animate={{
                    y: [0, -6, 0],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="relative mx-auto flex aspect-[4/3] items-center justify-center overflow-hidden rounded-[30px] border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-indigo-50"
                >
                  {jobSearchAnimation ? (
                    <Lottie
                      src={jobSearchAnimation}
                      loop={true}
                      autoplay={true}
                      rendererSettings={{
                        preserveAspectRatio: "xMidYMid meet",
                      }}
                      className="h-[250px] w-full max-w-[330px]"
                    />
                  ) : (
                    <div className="relative flex h-44 w-44 items-center justify-center rounded-full bg-white shadow-[0_24px_60px_rgba(37,99,235,0.12)] ring-1 ring-blue-100">
                      <div className="absolute inset-7 rounded-full bg-blue-100/60 blur-2xl" />
                      <Briefcase
                        size={64}
                        className="relative text-blue-600"
                      />
                    </div>
                  )}
                </motion.div>

                <div className="absolute left-8 top-8 rounded-2xl border border-white/90 bg-white/90 p-3 shadow-lg backdrop-blur">
                  <Building2 size={20} className="text-indigo-600" />
                </div>

                <div className="absolute bottom-9 right-8 rounded-2xl border border-white/90 bg-white/90 p-3 shadow-lg backdrop-blur">
                  <Sparkles size={20} className="text-blue-600" />
                </div>

              </div>
            </motion.div>

          </div>
        </motion.section>

        {/* Main Job Workspace */}
        <section className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">

          {/* Add Job */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.1,
              duration: 0.5,
            }}
            className="rounded-[28px] border border-slate-200/80 bg-white p-6 shadow-[0_16px_50px_rgba(15,23,42,0.05)] sm:p-8"
          >
            <div className="mb-7 flex items-start justify-between gap-4">
              <div>
                <p className="cp-eyebrow">
                  New opportunity
                </p>

                <h2 className="mt-2 text-2xl font-bold tracking-[-0.035em] text-slate-950">
                  Add New Job
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Capture the role details and start tracking your application.
                </p>
              </div>

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 ring-1 ring-blue-100">
                <PlusCircle size={20} />
              </div>
            </div>

            <JobForm
              onJobAdded={() =>
                setRefreshKey((prev) => prev + 1)
              }
            />
          </motion.div>

          {/* Job List */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.16,
              duration: 0.5,
            }}
            className="rounded-[28px] border border-slate-200/80 bg-white p-6 shadow-[0_16px_50px_rgba(15,23,42,0.05)] sm:p-8"
          >
            <div className="mb-7 flex items-start justify-between gap-4">
              <div>
                <p className="cp-eyebrow">
                  Your pipeline
                </p>

                <h2 className="mt-2 text-2xl font-bold tracking-[-0.035em] text-slate-950">
                  Your Applications
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Review statuses, company information, and available actions.
                </p>
              </div>

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 ring-1 ring-indigo-100">
                <ArrowRight size={19} />
              </div>
            </div>

            <JobList refresh={refreshKey} />
          </motion.div>

        </section>

      </div>
    </DashboardLayout>
  );
}

export default Jobs;