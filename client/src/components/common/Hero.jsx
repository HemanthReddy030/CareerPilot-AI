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
  Target,
  Stars,
  Search,
  TrendingUp,
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
      {/* BACKGROUND */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-60 top-10 h-[520px] w-[520px] rounded-full bg-blue-100/45 blur-3xl" />

        <div className="absolute -right-60 top-24 h-[540px] w-[540px] rounded-full bg-indigo-100/40 blur-3xl" />

        <div className="absolute bottom-[-220px] left-1/2 h-[450px] w-[850px] -translate-x-1/2 rounded-full bg-sky-100/30 blur-3xl" />

        <div
          className="absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage:
              "radial-gradient(#cbd5e1 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />
      </div>

      {/* LEFT EDGE ICON */}
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.8,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          delay: 0.6,
        }}
        className="pointer-events-none absolute left-6 top-[42%] hidden 2xl:block"
      >
        <motion.div
          animate={{
            y: [0, -8, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-100 bg-white/90 text-blue-600 shadow-lg backdrop-blur-xl"
        >
          <Search size={20} />
        </motion.div>
      </motion.div>

      {/* RIGHT EDGE ICON */}
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.8,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          delay: 0.7,
        }}
        className="pointer-events-none absolute right-6 top-[43%] hidden 2xl:block"
      >
        <motion.div
          animate={{
            y: [0, 8, 0],
          }}
          transition={{
            duration: 5.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="flex h-12 w-12 items-center justify-center rounded-2xl border border-indigo-100 bg-white/90 text-indigo-600 shadow-lg backdrop-blur-xl"
        >
          <TrendingUp size={20} />
        </motion.div>
      </motion.div>

      {/* MAIN CONTENT */}
      <div className="relative mx-auto grid min-h-[calc(100vh-80px)] max-w-[1450px] items-center gap-12 px-6 py-14 sm:px-8 lg:grid-cols-[1fr_1fr] lg:px-10 lg:py-16 xl:px-14">

        {/* LEFT */}
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
          className="relative z-10"
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

          <h1 className="mt-7 max-w-4xl text-5xl font-bold leading-[1.04] tracking-[-0.055em] text-slate-950 sm:text-6xl xl:text-[70px]">
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
              whileHover={{
                y: -2,
              }}
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
          <div className="mt-11 grid max-w-3xl gap-3 sm:grid-cols-3">
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
            ].map((item, index) => {
              const Icon = item.icon;

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
                    delay: 0.2 + index * 0.08,
                  }}
                  whileHover={{
                    y: -4,
                  }}
                  className="group rounded-[22px] border border-slate-200/80 bg-white/90 p-4 shadow-[0_10px_30px_rgba(15,23,42,0.04)] backdrop-blur-xl transition-all duration-300 hover:border-blue-100 hover:shadow-[0_18px_45px_rgba(37,99,235,0.08)]"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-transform duration-300 group-hover:scale-105">
                    <Icon size={18} />
                  </div>

                  <p className="mt-3 text-sm font-bold text-slate-900">
                    {item.title}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    {item.text}
                  </p>
                </motion.div>
              );
            })}
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
          className="relative z-10 flex items-center justify-center"
        >
          <div className="absolute h-[480px] w-[480px] rounded-full bg-gradient-to-br from-blue-100/65 to-indigo-100/55 blur-3xl" />

          {/* AI BADGE */}
          <motion.div
            animate={{
              y: [0, -5, 0],
            }}
            transition={{
              duration: 4.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute right-8 top-[-12px] z-30 hidden items-center gap-2 rounded-full border border-indigo-100 bg-white/95 px-4 py-2 text-xs font-bold text-indigo-600 shadow-lg backdrop-blur md:flex"
          >
            <Stars size={14} />

            AI Career Assistant
          </motion.div>

          {/* MAIN IMAGE */}
          <motion.div
            animate={{
              y: [0, -7, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative w-full max-w-[630px] rounded-[42px] border border-white bg-white/80 p-5 shadow-[0_32px_100px_rgba(37,99,235,0.12)] backdrop-blur-xl sm:p-7"
          >
            <div className="relative overflow-hidden rounded-[30px] bg-gradient-to-br from-blue-50/60 via-white to-indigo-50/60 p-3">
              <img
                src={HeroImage}
                alt="CareerPilot AI career management illustration"
                className="w-full"
              />
            </div>

            {/* APPLICATION */}
            <motion.div
              animate={{
                y: [0, -6, 0],
              }}
              transition={{
                duration: 4.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -left-5 top-12 hidden rounded-[20px] border border-slate-200 bg-white p-4 shadow-[0_16px_45px_rgba(15,23,42,0.1)] sm:block"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <BriefcaseBusiness size={18} />
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

            {/* RESUME */}
            <motion.div
              animate={{
                y: [0, 7, 0],
              }}
              transition={{
                duration: 5.4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -right-4 bottom-16 hidden rounded-[20px] border border-slate-200 bg-white p-4 shadow-[0_16px_45px_rgba(15,23,42,0.1)] sm:block"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <FileCheck2 size={18} />
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

            {/* CAREER GOAL */}
            <motion.div
              animate={{
                y: [0, -4, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute bottom-[-24px] left-[30%] hidden items-center gap-3 rounded-[20px] border border-slate-200 bg-white p-4 shadow-[0_16px_45px_rgba(15,23,42,0.09)] lg:flex"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                <Target size={18} />
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
                  Career Goal
                </p>

                <p className="mt-1 text-sm font-bold text-slate-900">
                  Progress on track
                </p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;