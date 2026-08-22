import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import {
  Sparkles,
  ShieldCheck,
  Layers,
  ArrowRight,
  BrainCircuit,
  BriefcaseBusiness,
  FileCheck2,
  CheckCircle2,
} from "lucide-react";

import HeroImage from "../../assets/illustrations/hero.svg";

function Hero() {
  const scrollToFeatures = () => {
    document
      .getElementById("features")
      ?.scrollIntoView({
        behavior: "smooth",
      });
  };

  return (
    <section className="relative overflow-hidden bg-white">

      {/* BACKGROUND EFFECTS */}
      <div className="pointer-events-none absolute inset-0">

        <div className="absolute -left-40 top-16 h-[420px] w-[420px] rounded-full bg-blue-100/50 blur-3xl" />

        <div className="absolute -right-40 top-40 h-[450px] w-[450px] rounded-full bg-indigo-100/40 blur-3xl" />

        <div
          className="absolute inset-0 opacity-[0.22]"
          style={{
            backgroundImage:
              "radial-gradient(#cbd5e1 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />

      </div>

      <div className="relative mx-auto grid min-h-[calc(100vh-80px)] max-w-7xl items-center gap-14 px-5 py-16 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">

        {/* LEFT CONTENT */}
        <motion.div
          initial={{
            opacity: 0,
            x: -24,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.7,
            ease: [0.16, 1, 0.3, 1],
          }}
        >

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
              delay: 0.1,
            }}
            className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50/80 px-4 py-2 text-xs font-bold uppercase tracking-[0.15em] text-blue-600"
          >
            <Sparkles size={14} />

            AI Career Management Platform
          </motion.div>

          <h1 className="mt-7 max-w-3xl text-5xl font-bold leading-[1.04] tracking-[-0.055em] text-slate-950 sm:text-6xl xl:text-7xl">

            Build your career.

            <span className="block bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 bg-clip-text text-transparent">
              Land the right job.
            </span>

          </h1>

          <p className="mt-7 max-w-2xl text-base leading-8 text-slate-500 sm:text-lg">
            CareerPilot AI brings job tracking, resume intelligence,
            interview preparation and career organization into one
            intelligent workspace.
          </p>

          {/* BUTTONS */}
          <div className="mt-9 flex flex-wrap gap-3">

            <motion.div
              whileHover={{ y: -2 }}
              whileTap={{
                scale: 0.985,
              }}
            >
              <Link
                to="/register"
                className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-7 py-3.5 text-sm font-bold text-white shadow-[0_12px_35px_rgba(15,23,42,0.16)] transition hover:bg-blue-600"
              >
                Get Started Free

                <ArrowRight size={17} />
              </Link>
            </motion.div>

            <motion.button
              type="button"
              onClick={scrollToFeatures}
              whileHover={{
                y: -2,
              }}
              whileTap={{
                scale: 0.985,
              }}
              className="rounded-full border border-slate-200 bg-white px-7 py-3.5 text-sm font-bold text-slate-700 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
            >
              Explore Features
            </motion.button>

          </div>

          {/* MINI FEATURES */}
          <div className="mt-11 grid max-w-2xl gap-3 sm:grid-cols-3">

            {[
              {
                icon: ShieldCheck,
                title: "Secure",
                text: "Career workspace",
              },
              {
                icon: Layers,
                title: "Organized",
                text: "Job tracking",
              },
              {
                icon: BrainCircuit,
                title: "AI Powered",
                text: "Smart preparation",
              },
            ].map(
              (item, index) => {
                const Icon =
                  item.icon;

                return (
                  <motion.div
                    key={item.title}
                    initial={{
                      opacity: 0,
                      y: 12,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      delay:
                        0.2 +
                        index * 0.08,
                    }}
                    whileHover={{
                      y: -3,
                    }}
                    className="rounded-[20px] border border-slate-200/80 bg-white/80 p-4 shadow-[0_10px_30px_rgba(15,23,42,0.04)] backdrop-blur-xl"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                      <Icon size={17} />
                    </div>

                    <p className="mt-3 text-sm font-bold text-slate-900">
                      {item.title}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      {item.text}
                    </p>
                  </motion.div>
                );
              }
            )}

          </div>
        </motion.div>

        {/* RIGHT ILLUSTRATION */}
        <motion.div
          initial={{
            opacity: 0,
            x: 28,
            scale: 0.97,
          }}
          animate={{
            opacity: 1,
            x: 0,
            scale: 1,
          }}
          transition={{
            duration: 0.75,
            delay: 0.08,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="relative flex items-center justify-center"
        >

          <div className="absolute h-[420px] w-[420px] rounded-full bg-gradient-to-br from-blue-100/70 to-indigo-100/60 blur-3xl" />

          <motion.div
            animate={{
              y: [0, -8, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative w-full max-w-[590px] rounded-[38px] border border-white bg-white/75 p-5 shadow-[0_30px_90px_rgba(37,99,235,0.12)] backdrop-blur-xl sm:p-7"
          >

            <img
              src={HeroImage}
              alt="CareerPilot AI career management illustration"
              className="w-full"
            />

            {/* FLOATING JOB CARD */}
            <motion.div
              animate={{
                y: [0, -6, 0],
              }}
              transition={{
                duration: 4.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -left-4 top-12 hidden rounded-[20px] border border-slate-200 bg-white p-4 shadow-[0_16px_45px_rgba(15,23,42,0.1)] sm:block"
            >
              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <BriefcaseBusiness
                    size={18}
                  />
                </div>

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Application
                  </p>

                  <p className="text-sm font-bold text-slate-900">
                    Interview Ready
                  </p>
                </div>

              </div>
            </motion.div>

            {/* FLOATING RESUME CARD */}
            <motion.div
              animate={{
                y: [0, 7, 0],
              }}
              transition={{
                duration: 5.4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -right-3 bottom-16 hidden rounded-[20px] border border-slate-200 bg-white p-4 shadow-[0_16px_45px_rgba(15,23,42,0.1)] sm:block"
            >
              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <FileCheck2
                    size={18}
                  />
                </div>

                <div>
                  <div className="flex items-center gap-1">
                    <CheckCircle2
                      size={12}
                      className="text-emerald-500"
                    />

                    <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">
                      Resume
                    </p>
                  </div>

                  <p className="mt-1 text-sm font-bold text-slate-900">
                    ATS Optimized
                  </p>
                </div>

              </div>
            </motion.div>

          </motion.div>

        </motion.div>

      </div>
    </section>
  );
}

export default Hero;