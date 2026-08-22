import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Lottie } from "lottie-react";
import {
  BrainCircuit,
  BriefcaseBusiness,
  Code2,
  FileText,
  Sparkles,
  AlertTriangle,
  CircleAlert,
  Bot,
  Mic2,
  WandSparkles,
} from "lucide-react";

import DashboardLayout from "../../layouts/DashboardLayout";
import QuestionCard from "../../components/interview/QuestionCard";
import VoiceInterview from "../../components/interview/VoiceInterview";

import {
  generateQuestion,
  evaluateAnswer,
} from "../../services/aiInterviewService";

function AIInterview() {
  const [aiInterviewAnimation, setAiInterviewAnimation] = useState(null);

  useEffect(() => {
    const loadAnimation = async () => {
      try {
        const response = await fetch("/gifs/Ai_Interview.json");
        if (!response.ok) {
          throw new Error("Unable to load AI Interview animation.");
        }
        const data = await response.json();
        setAiInterviewAnimation(data);
      } catch (error) {
        console.error("Failed to load AI Interview animation:", error);
      }
    };
    loadAnimation();
  }, []);

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerateQuestion = async (type) => {
    try {
      setError("");
      setNotice("");
      setLoading(true);

      const data = await generateQuestion(type);

      setQuestion(data.question);
      setAnswer("");
      setFeedback("");
      setNotice(data.notice || "");
    } catch (error) {
      console.error(error);

      setError(
        error.message ||
        "Failed to generate question."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleEvaluate = async () => {
    if (!answer.trim()) {
      alert(
        "Please write or speak your answer first."
      );
      return;
    }

    try {
      setError("");
      setNotice("");
      setLoading(true);

      const data = await evaluateAnswer(
        question,
        answer
      );

      setFeedback(data.feedback);
      setNotice(data.notice || "");
    } catch (error) {
      console.error(error);

      setError(
        error.message ||
        "Failed to evaluate answer."
      );
    } finally {
      setLoading(false);
    }
  };

  const interviewTypes = [
    {
      label: "HR Interview",
      type: "HR",
      description:
        "Practice communication, behavioral, and HR-focused interview questions.",
      icon: BriefcaseBusiness,
      tone:
        "from-blue-50 via-white to-sky-50 border-blue-100 text-blue-600",
    },
    {
      label: "Technical Interview",
      type: "Technical",
      description:
        "Prepare for technical questions and role-specific problem solving.",
      icon: Code2,
      tone:
        "from-emerald-50 via-white to-teal-50 border-emerald-100 text-emerald-600",
    },
    {
      label: "Resume Interview",
      type: "Resume",
      description:
        "Practice questions based on your projects, skills, and resume experience.",
      icon: FileText,
      tone:
        "from-violet-50 via-white to-indigo-50 border-violet-100 text-violet-600",
    },
  ];

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
          className="relative overflow-hidden rounded-[32px] border border-blue-100/80 bg-white p-7 shadow-[0_20px_70px_rgba(15,23,42,0.06)] sm:p-8 lg:p-10"
        >
          <div className="pointer-events-none absolute -right-24 -top-28 h-80 w-80 rounded-full bg-blue-100/45 blur-3xl" />

          <div className="pointer-events-none absolute -bottom-28 left-[30%] h-72 w-72 rounded-full bg-indigo-100/35 blur-3xl" />

          <div className="relative grid items-center gap-10 xl:grid-cols-[1.12fr_0.88fr]">

            {/* LEFT */}
            <div>
              <motion.div
                initial={{
                  opacity: 0,
                  y: 8,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.08,
                }}
                className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-blue-600"
              >
                <Sparkles size={14} />
                Groq AI Interview Coach
              </motion.div>

              <motion.h1
                initial={{
                  opacity: 0,
                  y: 12,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.12,
                  duration: 0.5,
                }}
                className="mt-5 max-w-3xl text-4xl font-bold tracking-[-0.045em] text-slate-950 sm:text-5xl"
              >
                Practice smarter.

                <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Interview with confidence.
                </span>
              </motion.h1>

              <motion.p
                initial={{
                  opacity: 0,
                  y: 12,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.17,
                  duration: 0.5,
                }}
                className="mt-5 max-w-2xl text-base leading-8 text-slate-500"
              >
                Prepare for HR, technical,
                and resume-focused interviews
                with Groq AI powered question
                generation and answer
                evaluation.
              </motion.p>

              <motion.div
                initial={{
                  opacity: 0,
                  y: 12,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.22,
                }}
                className="mt-7 flex flex-wrap gap-3"
              >
                <div className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm">
                  <BrainCircuit
                    size={17}
                    className="text-blue-600"
                  />
                  AI Questions
                </div>

                <div className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm">
                  <Mic2
                    size={17}
                    className="text-indigo-600"
                  />
                  Voice Practice
                </div>

                <div className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm">
                  <WandSparkles
                    size={17}
                    className="text-emerald-600"
                  />
                  AI Feedback
                </div>
              </motion.div>
            </div>

            {/* RIGHT VISUAL */}
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
                  {aiInterviewAnimation ? (
                    <Lottie
                      src={aiInterviewAnimation}
                      loop={true}
                      autoplay={true}
                      rendererSettings={{
                        preserveAspectRatio: "xMidYMid meet",
                      }}
                      className="h-[250px] w-full max-w-[330px]"
                    />
                  ) : (
                    /* Fallback static Bot view */
                    <div className="relative flex h-48 w-48 items-center justify-center rounded-full bg-white shadow-[0_26px_70px_rgba(37,99,235,0.12)] ring-1 ring-blue-100">
                      <div className="absolute inset-8 rounded-full bg-gradient-to-br from-blue-100/80 to-indigo-100/70 blur-2xl" />
                      <Bot
                        size={72}
                        className="relative text-blue-600"
                      />
                    </div>
                  )}
                </motion.div>

                <motion.div
                  animate={{
                    y: [0, -4, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute left-8 top-8 rounded-2xl border border-white/90 bg-white/90 p-3 shadow-lg backdrop-blur"
                >
                  <BrainCircuit
                    size={20}
                    className="text-indigo-600"
                  />
                </motion.div>

                <motion.div
                  animate={{
                    y: [0, 4, 0],
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

        {/* INTERVIEW TYPES */}
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
            delay: 0.08,
            duration: 0.5,
          }}
        >
          <div className="mb-5">
            <p className="cp-eyebrow">
              Practice Modes
            </p>

            <h2 className="mt-2 text-2xl font-bold tracking-[-0.035em] text-slate-950">
              Choose your interview type
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Select a mode and CareerPilot
              AI will generate your next
              practice question.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {interviewTypes.map(
              (item, index) => {
                const Icon = item.icon;

                return (
                  <motion.button
                    key={item.type}
                    type="button"
                    disabled={loading}
                    onClick={() =>
                      handleGenerateQuestion(
                        item.type
                      )
                    }
                    initial={{
                      opacity: 0,
                      y: 14,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      delay:
                        0.12 +
                        index * 0.06,
                    }}
                    whileHover={
                      loading
                        ? undefined
                        : {
                          y: -4,
                        }
                    }
                    whileTap={
                      loading
                        ? undefined
                        : {
                          scale: 0.985,
                        }
                    }
                    className={`group relative overflow-hidden rounded-[26px] border bg-gradient-to-br p-6 text-left shadow-[0_12px_40px_rgba(15,23,42,0.045)] transition-shadow duration-300 hover:shadow-[0_20px_55px_rgba(15,23,42,0.08)] disabled:cursor-not-allowed disabled:opacity-60 ${item.tone}`}
                  >
                    <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-current opacity-[0.04] blur-3xl" />

                    <div className="relative">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-slate-100">
                        <Icon size={22} />
                      </div>

                      <h3 className="mt-5 text-lg font-bold text-slate-900">
                        {item.label}
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-slate-500">
                        {item.description}
                      </p>
                    </div>
                  </motion.button>
                );
              }
            )}
          </div>
        </motion.section>

        {/* AI THINKING GIF */}
        {loading && (
          <motion.section
            initial={{
              opacity: 0,
              y: 12,
              scale: 0.98,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            transition={{
              duration: 0.4,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="relative overflow-hidden rounded-[28px] border border-blue-100 bg-white p-6 shadow-[0_16px_50px_rgba(37,99,235,0.08)] sm:p-8"
          >
            <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-blue-100/50 blur-3xl" />

            <div className="pointer-events-none absolute -bottom-20 left-[25%] h-44 w-44 rounded-full bg-indigo-100/40 blur-3xl" />

            <div className="relative flex flex-col items-center justify-center text-center">

              <motion.div
                animate={{
                  y: [0, -5, 0],
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative"
              >
                <div className="absolute inset-4 rounded-full bg-blue-200/30 blur-2xl" />

                <img
                  src="/gifs/ai-thinking.gif"
                  alt="CareerPilot AI is thinking"
                  className="relative h-32 w-32 object-contain sm:h-36 sm:w-36"
                />
              </motion.div>

              <div className="mt-5 flex items-center justify-center gap-3">

                <h3 className="text-lg font-bold text-slate-900">
                  CareerPilot AI is thinking
                </h3>

                <div className="cp-thinking-dots">
                  <span />
                  <span />
                  <span />
                </div>

              </div>

              <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
                Groq AI is preparing your
                interview response and
                personalized feedback.
              </p>

              <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-xs font-semibold text-blue-600">

                <Sparkles size={13} />

                Powered by Groq AI

              </div>

            </div>
          </motion.section>
        )}

        {/* NOTICE */}
        {notice && (
          <motion.div
            initial={{
              opacity: 0,
              y: 8,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="flex items-start gap-3 rounded-[22px] border border-amber-200 bg-amber-50/80 p-5 text-amber-900"
          >
            <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-amber-600 ring-1 ring-amber-200">

              <AlertTriangle size={17} />

            </div>

            <div>
              <p className="text-sm font-bold">
                Notice
              </p>

              <p className="mt-1 text-sm leading-6 text-amber-800">
                {notice}
              </p>
            </div>
          </motion.div>
        )}

        {/* ERROR */}
        {error && (
          <motion.div
            initial={{
              opacity: 0,
              y: 8,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="flex items-start gap-3 rounded-[22px] border border-rose-200 bg-rose-50/80 p-5 text-rose-900"
          >
            <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-rose-600 ring-1 ring-rose-200">

              <CircleAlert size={17} />

            </div>

            <div>
              <p className="text-sm font-bold">
                Something went wrong
              </p>

              <p className="mt-1 text-sm leading-6 text-rose-700">
                {error}
              </p>
            </div>
          </motion.div>
        )}

        {/* INTERVIEW WORKSPACE */}
        {question && (
          <motion.section
            initial={{
              opacity: 0,
              y: 16,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.45,
            }}
            className="space-y-6"
          >
            {/* QUESTION */}
            <div className="rounded-[28px] border border-slate-200/80 bg-white p-6 shadow-[0_16px_50px_rgba(15,23,42,0.05)] sm:p-8">

              <div className="mb-6 flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 ring-1 ring-blue-100">
                  <Bot size={20} />
                </div>

                <div>
                  <p className="cp-eyebrow">
                    Current Question
                  </p>

                  <h2 className="mt-1 text-xl font-bold text-slate-950">
                    AI Interview Practice
                  </h2>
                </div>

              </div>

              <QuestionCard
                question={question}
                answer={answer}
                onAnswerChange={setAnswer}
                onEvaluate={handleEvaluate}
              />

            </div>

            {/* VOICE */}
            <div className="rounded-[28px] border border-slate-200/80 bg-white p-6 shadow-[0_16px_50px_rgba(15,23,42,0.05)] sm:p-8">

              <div className="mb-6 flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 ring-1 ring-indigo-100">
                  <Mic2 size={20} />
                </div>

                <div>
                  <p className="cp-eyebrow">
                    Voice Mode
                  </p>

                  <h2 className="mt-1 text-xl font-bold text-slate-950">
                    Practice your answer aloud
                  </h2>
                </div>

              </div>

              <VoiceInterview
                question={question}
                onTranscript={setAnswer}
              />

            </div>

          </motion.section>
        )}

        {/* FEEDBACK */}
        {feedback && (
          <motion.section
            initial={{
              opacity: 0,
              y: 16,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.45,
            }}
            className="relative overflow-hidden rounded-[28px] border border-emerald-100 bg-white p-6 shadow-[0_18px_60px_rgba(16,185,129,0.07)] sm:p-8"
          >
            <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-emerald-100/45 blur-3xl" />

            <div className="relative">

              <div className="flex items-center gap-3">

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100">
                  <WandSparkles
                    size={21}
                  />
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-600">
                    Groq AI Evaluation
                  </p>

                  <h2 className="mt-1 text-2xl font-bold tracking-[-0.03em] text-slate-950">
                    Interview Feedback
                  </h2>
                </div>

              </div>

              <div className="mt-6 rounded-[22px] border border-slate-200 bg-slate-50/70 p-5">

                <pre className="whitespace-pre-wrap font-sans text-sm leading-7 text-slate-700 sm:text-base">
                  {feedback}
                </pre>

              </div>

            </div>
          </motion.section>
        )}

      </div>
    </DashboardLayout>
  );
}

export default AIInterview;