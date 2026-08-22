import { motion } from "framer-motion";

import {
  FileText,
  Cpu,
  ClipboardList,
  User,
  BarChart3,
  Map,
  Sparkles,
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "ATS Resume Score",
    desc: "Analyze your resume and understand how effectively it performs with applicant tracking systems.",
    tag: "Resume Intelligence",
  },
  {
    icon: Cpu,
    title: "AI Resume Optimizer",
    desc: "Improve resume content with intelligent suggestions designed around your target opportunities.",
    tag: "AI Optimization",
  },
  {
    icon: ClipboardList,
    title: "Application Tracker",
    desc: "Organize applications, statuses, priorities and job information from one clean workspace.",
    tag: "Job Management",
  },
  {
    icon: User,
    title: "AI Interview Prep",
    desc: "Practice HR, technical and resume-based interview questions with intelligent AI evaluation.",
    tag: "Interview AI",
  },
  {
    icon: BarChart3,
    title: "Career Analytics",
    desc: "Understand your application progress and job-search activity through useful visual insights.",
    tag: "Analytics",
  },
  {
    icon: Map,
    title: "Career Roadmap",
    desc: "Identify skill gaps and build a structured learning direction for the role you want.",
    tag: "Career Growth",
  },
];

function Features() {
  return (
    <section
      id="features"
      className="relative overflow-hidden bg-white py-24 sm:py-28"
    >
      {/* BACKGROUND */}
      <div className="pointer-events-none absolute inset-0">

        <div className="absolute left-1/2 top-0 h-[420px] w-[650px] -translate-x-1/2 rounded-full bg-blue-50/80 blur-3xl" />

      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">

        {/* HEADING */}
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            duration: 0.6,
          }}
          className="mx-auto max-w-3xl text-center"
        >

          <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-blue-600">
            <Sparkles size={14} />

            Why CareerPilot AI
          </div>

          <h2 className="mt-6 text-4xl font-bold tracking-[-0.045em] text-slate-950 sm:text-5xl">
            Everything your job search
            <span className="block text-blue-600">
              needs in one place.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-500">
            From your first application to your final interview,
            CareerPilot helps keep your career journey organized,
            intelligent and easier to manage.
          </p>

        </motion.div>

        {/* FEATURES */}
        <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">

          {features.map(
            (feature, index) => {
              const Icon =
                feature.icon;

              return (
                <motion.article
                  key={feature.title}
                  initial={{
                    opacity: 0,
                    y: 24,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.2,
                  }}
                  transition={{
                    duration: 0.5,
                    delay:
                      index * 0.06,
                  }}
                  whileHover={{
                    y: -6,
                  }}
                  className="group relative overflow-hidden rounded-[28px] border border-slate-200/80 bg-white p-7 shadow-[0_12px_40px_rgba(15,23,42,0.05)] transition-shadow duration-300 hover:shadow-[0_22px_60px_rgba(37,99,235,0.1)]"
                >

                  <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-blue-50 opacity-0 blur-3xl transition-opacity duration-300 group-hover:opacity-100" />

                  <div className="relative">

                    <div className="flex items-start justify-between">

                      <div className="flex h-13 w-13 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 text-blue-600 ring-1 ring-blue-100">
                        <Icon size={23} />
                      </div>

                      <ArrowUpRight
                        size={18}
                        className="text-slate-300 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-blue-500"
                      />

                    </div>

                    <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.18em] text-blue-500">
                      {feature.tag}
                    </p>

                    <h3 className="mt-2 text-xl font-bold tracking-[-0.025em] text-slate-950">
                      {feature.title}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-slate-500">
                      {feature.desc}
                    </p>

                    <div className="mt-6 flex items-center gap-2 border-t border-slate-100 pt-5 text-xs font-semibold text-slate-500">

                      <CheckCircle2
                        size={14}
                        className="text-emerald-500"
                      />

                      Built into CareerPilot

                    </div>

                  </div>

                </motion.article>
              );
            }
          )}

        </div>

        {/* BOTTOM CTA */}
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          className="relative mt-16 overflow-hidden rounded-[34px] border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-indigo-50 px-6 py-10 text-center shadow-[0_18px_55px_rgba(37,99,235,0.07)] sm:px-10"
        >

          <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-blue-200/30 blur-3xl" />

          <div className="relative">

            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-blue-600 shadow-sm ring-1 ring-blue-100">
              <Sparkles size={20} />
            </div>

            <h3 className="mt-5 text-2xl font-bold tracking-[-0.035em] text-slate-950 sm:text-3xl">
              One workspace for your complete career journey.
            </h3>

            <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-slate-500">
              Track opportunities, improve your resume, prepare for
              interviews and understand your progress without switching
              between multiple tools.
            </p>

          </div>

        </motion.div>

      </div>
    </section>
  );
}

export default Features;