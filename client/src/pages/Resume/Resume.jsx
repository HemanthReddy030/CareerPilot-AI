import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Lottie } from "lottie-react";
import {
  FileText,
  Sparkles,
  ShieldCheck,
  UploadCloud,
  ScanSearch,
  CheckCircle2,
} from "lucide-react";

import DashboardLayout from "../../layouts/DashboardLayout";
import ResumeUpload from "../../components/resume/ResumeUpload";
import ResumeList from "../../components/resume/ResumeList";

function Resume() {
  const [resumeAnimation, setResumeAnimation] = useState(null);

  useEffect(() => {
    const loadAnimation = async () => {
      try {
        const response = await fetch("/gifs/Resume.json");
        if (!response.ok) {
          throw new Error("Unable to load resume animation.");
        }
        const data = await response.json();
        setResumeAnimation(data);
      } catch (error) {
        console.error("Failed to load resume animation:", error);
      }
    };
    loadAnimation();
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-8">

        {/* Resume Hero */}
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.55,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="relative overflow-hidden rounded-[32px] border border-blue-100/80 bg-white p-7 shadow-[0_20px_70px_rgba(15,23,42,0.06)] sm:p-8 lg:p-10"
        >
          {/* Ambient background */}
          <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-blue-100/45 blur-3xl" />

          <div className="pointer-events-none absolute -bottom-28 left-[35%] h-72 w-72 rounded-full bg-indigo-100/35 blur-3xl" />

          <div className="relative grid items-center gap-10 xl:grid-cols-[1.12fr_0.88fr]">

            {/* Hero content */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 }}
                className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-blue-600"
              >
                <FileText size={14} />
                Resume Hub
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
                Build a stronger
                <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  career profile.
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
                Upload, manage, review, and access your latest resume versions
                from one professional workspace.
              </motion.p>

              {/* Hero features */}
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
                  <UploadCloud
                    size={17}
                    className="text-blue-600"
                  />

                  Resume Upload
                </div>

                <div className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm">
                  <ScanSearch
                    size={17}
                    className="text-indigo-600"
                  />

                  ATS Ready
                </div>

                <div className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm">
                  <ShieldCheck
                    size={17}
                    className="text-emerald-600"
                  />

                  Secure Library
                </div>
              </motion.div>
            </div>

            {/* Resume Illustration */}
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
                  {resumeAnimation ? (
                    <Lottie
                      src={resumeAnimation}
                      loop={true}
                      autoplay={true}
                      rendererSettings={{
                        preserveAspectRatio: "xMidYMid meet",
                      }}
                      className="h-[250px] w-full max-w-[330px]"
                    />
                  ) : (
                    /* Resume document */
                    <div className="relative w-[185px] rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_25px_65px_rgba(15,23,42,0.12)]">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                          <FileText size={21} />
                        </div>

                        <div className="flex-1">
                          <div className="h-2.5 w-20 rounded-full bg-slate-200" />
                          <div className="mt-2 h-2 w-14 rounded-full bg-slate-100" />
                        </div>
                      </div>

                      <div className="mt-6 space-y-3">
                        <div className="h-2 w-full rounded-full bg-slate-100" />
                        <div className="h-2 w-[88%] rounded-full bg-slate-100" />
                        <div className="h-2 w-[94%] rounded-full bg-slate-100" />
                      </div>

                      <div className="mt-5">
                        <div className="h-2.5 w-16 rounded-full bg-blue-100" />

                        <div className="mt-3 flex flex-wrap gap-2">
                          <span className="h-5 w-12 rounded-lg bg-blue-50" />
                          <span className="h-5 w-14 rounded-lg bg-indigo-50" />
                          <span className="h-5 w-10 rounded-lg bg-emerald-50" />
                        </div>
                      </div>

                      <div className="absolute -right-3 -top-3 flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg">
                        <CheckCircle2 size={18} />
                      </div>
                    </div>
                  )}
                </motion.div>

                {/* Floating elements */}
                <motion.div
                  animate={{
                    y: [0, -5, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute left-8 top-8 rounded-2xl border border-white/90 bg-white/90 p-3 shadow-lg backdrop-blur"
                >
                  <ScanSearch
                    size={20}
                    className="text-indigo-600"
                  />
                </motion.div>

                <motion.div
                  animate={{
                    y: [0, 5, 0],
                  }}
                  transition={{
                    duration: 4.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute bottom-8 right-8 rounded-2xl border border-white/90 bg-white/90 p-3 shadow-lg backdrop-blur"
                >
                  <Sparkles
                    size={20}
                    className="text-blue-600"
                  />
                </motion.div>

              </div>
            </motion.div>

          </div>
        </motion.section>

        {/* Resume Workspace */}
        <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">

          {/* Upload Section */}
          <motion.div
            initial={{
              opacity: 0,
              y: 18,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.12,
              duration: 0.5,
            }}
            className="rounded-[28px] border border-slate-200/80 bg-white p-6 shadow-[0_16px_50px_rgba(15,23,42,0.05)] sm:p-8"
          >
            <div className="mb-7 flex items-start justify-between gap-4">

              <div>
                <p className="cp-eyebrow">
                  Upload
                </p>

                <h2 className="mt-2 text-2xl font-bold tracking-[-0.035em] text-slate-950">
                  Upload Resume
                </h2>

                <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
                  Add your latest PDF, DOC, or DOCX resume to your CareerPilot
                  library.
                </p>
              </div>

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 ring-1 ring-blue-100">
                <UploadCloud size={20} />
              </div>

            </div>

            <ResumeUpload />
          </motion.div>

          {/* Resume Library */}
          <motion.div
            initial={{
              opacity: 0,
              y: 18,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.18,
              duration: 0.5,
            }}
            className="rounded-[28px] border border-slate-200/80 bg-white p-6 shadow-[0_16px_50px_rgba(15,23,42,0.05)] sm:p-8"
          >
            <div className="mb-7 flex items-start justify-between gap-4">

              <div>
                <p className="cp-eyebrow">
                  Resume Library
                </p>

                <h2 className="mt-2 text-2xl font-bold tracking-[-0.035em] text-slate-950">
                  Your Uploaded Resumes
                </h2>

                <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
                  View, download, and manage every resume version you have
                  uploaded.
                </p>
              </div>

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 ring-1 ring-indigo-100">
                <FileText size={20} />
              </div>

            </div>

            <ResumeList />
          </motion.div>

        </section>

      </div>
    </DashboardLayout>
  );
}

export default Resume;