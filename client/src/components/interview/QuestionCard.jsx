import { motion } from "framer-motion";
import {
  BrainCircuit,
  MessageSquareText,
  Sparkles,
  Send,
} from "lucide-react";

function QuestionCard({
  question,
  answer,
  onAnswerChange,
  onEvaluate,
}) {
  return (
    <div className="space-y-6">

      {/* Question */}
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
          duration: 0.45,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="relative overflow-hidden rounded-[24px] border border-blue-100 bg-gradient-to-br from-blue-50/80 via-white to-indigo-50/60 p-6"
      >
        {/* Ambient glow */}
        <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-blue-200/30 blur-3xl" />

        <div className="relative flex items-start gap-4">

          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-blue-600 shadow-sm ring-1 ring-blue-100">
            <BrainCircuit size={20} />
          </div>

          <div className="min-w-0 flex-1">

            <div className="flex flex-wrap items-center gap-2">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-blue-600">
                Interview Question
              </p>

              <span className="inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-[10px] font-semibold text-indigo-600 shadow-sm ring-1 ring-indigo-100">
                <Sparkles size={10} />

                AI Generated
              </span>
            </div>

            <p className="mt-4 text-lg font-semibold leading-8 tracking-[-0.015em] text-slate-900 sm:text-xl">
              {question}
            </p>

          </div>

        </div>
      </motion.div>

      {/* Answer */}
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
          duration: 0.45,
        }}
      >
        <div className="mb-3 flex items-center justify-between gap-3">

          <div className="flex items-center gap-2">
            <MessageSquareText
              size={17}
              className="text-slate-500"
            />

            <label className="text-sm font-bold text-slate-800">
              Your Answer
            </label>
          </div>

          <span className="text-xs font-medium text-slate-400">
            {answer.length} characters
          </span>

        </div>

        <div className="group relative">

          <textarea
            rows="8"
            value={answer}
            onChange={(e) =>
              onAnswerChange(e.target.value)
            }
            placeholder="Write your interview answer here..."
            className="min-h-[200px] w-full resize-none rounded-[22px] border border-slate-200 bg-slate-50/70 p-5 text-sm leading-7 text-slate-700 outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-blue-300 focus:bg-white focus:ring-4 focus:ring-blue-500/5 sm:text-base"
          />

          <div className="pointer-events-none absolute bottom-4 right-4 rounded-lg bg-white/90 px-2 py-1 text-[10px] font-medium text-slate-400 shadow-sm ring-1 ring-slate-200/70 backdrop-blur">
            Type or use voice
          </div>

        </div>
      </motion.div>

      {/* Evaluate */}
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
          delay: 0.13,
        }}
        className="flex justify-end"
      >
        <motion.button
          type="button"
          onClick={onEvaluate}
          whileHover={{
            y: -2,
          }}
          whileTap={{
            scale: 0.985,
          }}
          className="cp-btn cp-btn-primary min-w-[190px] px-6 py-3.5"
        >
          <Sparkles size={17} />

          Evaluate with AI

          <Send size={16} />
        </motion.button>
      </motion.div>

    </div>
  );
}

export default QuestionCard;