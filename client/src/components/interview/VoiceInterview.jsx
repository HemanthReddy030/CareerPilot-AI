import {
  useEffect,
  useRef,
  useState,
} from "react";

import { motion } from "framer-motion";

import {
  Mic,
  Square,
  Volume2,
  AudioLines,
  Radio,
  Sparkles,
} from "lucide-react";

function VoiceInterview({
  question,
  onTranscript,
}) {
  const [listening, setListening] =
    useState(false);

  const recognitionRef =
    useRef(null);

  useEffect(() => {
    if (
      "webkitSpeechRecognition" in
      window
    ) {
      const recognition =
        new window.webkitSpeechRecognition();

      recognition.continuous = true;

      recognition.interimResults =
        true;

      recognition.lang = "en-US";

      recognition.onresult = (
        event
      ) => {
        let transcript = "";

        for (
          let i = event.resultIndex;
          i < event.results.length;
          i++
        ) {
          transcript +=
            event.results[i][0]
              .transcript;
        }

        onTranscript(transcript);
      };

      recognition.onend = () => {
        setListening(false);
      };

      recognitionRef.current =
        recognition;
    }
  }, [onTranscript]);

  const startListening = () => {
    if (
      !recognitionRef.current
    ) {
      alert(
        "Speech Recognition is not supported in this browser."
      );

      return;
    }

    recognitionRef.current.start();

    setListening(true);
  };

  const stopListening = () => {
    recognitionRef.current?.stop();

    setListening(false);
  };

  const speakQuestion = () => {
    if (!question) return;

    const speech =
      new SpeechSynthesisUtterance(
        question
      );

    speech.lang = "en-US";

    window.speechSynthesis.speak(
      speech
    );
  };

  return (
    <div className="space-y-6">

      {/* Intro */}
      <div className="relative overflow-hidden rounded-[24px] border border-indigo-100 bg-gradient-to-br from-indigo-50/70 via-white to-blue-50/60 p-5 sm:p-6">

        <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-indigo-200/30 blur-3xl" />

        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

          <div className="flex items-center gap-4">

            <motion.div
              animate={
                listening
                  ? {
                    scale: [
                      1,
                      1.06,
                      1,
                    ],
                  }
                  : {}
              }
              transition={{
                duration: 1.7,
                repeat: listening
                  ? Infinity
                  : 0,
                ease: "easeInOut",
              }}
              className={`relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl shadow-sm ring-1 transition-colors duration-300 ${listening
                  ? "bg-emerald-50 text-emerald-600 ring-emerald-100"
                  : "bg-white text-indigo-600 ring-indigo-100"
                }`}
            >
              {listening ? (
                <AudioLines
                  size={24}
                />
              ) : (
                <Mic size={24} />
              )}

              {listening && (
                <motion.span
                  initial={{
                    opacity: 0.5,
                    scale: 0.9,
                  }}
                  animate={{
                    opacity: 0,
                    scale: 1.5,
                  }}
                  transition={{
                    duration: 1.6,
                    repeat: Infinity,
                    ease: "easeOut",
                  }}
                  className="absolute inset-0 rounded-2xl border border-emerald-400"
                />
              )}
            </motion.div>

            <div>
              <div className="flex flex-wrap items-center gap-2">

                <h3 className="text-base font-bold text-slate-900">
                  Voice Interview
                </h3>

                <span className="inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-[10px] font-semibold text-indigo-600 shadow-sm ring-1 ring-indigo-100">
                  <Sparkles
                    size={10}
                  />

                  Voice Mode
                </span>

              </div>

              <p className="mt-1.5 max-w-lg text-sm leading-6 text-slate-500">
                Listen to the question
                and practice answering
                naturally using your
                microphone.
              </p>
            </div>

          </div>

        </div>

      </div>

      {/* Voice controls */}
      <div className="grid gap-3 sm:grid-cols-2">

        <motion.button
          type="button"
          onClick={speakQuestion}
          whileHover={{
            y: -2,
          }}
          whileTap={{
            scale: 0.985,
          }}
          className="group flex items-center justify-center gap-3 rounded-[18px] border border-indigo-100 bg-indigo-50/70 px-5 py-4 text-sm font-bold text-indigo-700 transition-all duration-300 hover:border-indigo-200 hover:bg-indigo-100/70 hover:shadow-md"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-indigo-600 shadow-sm ring-1 ring-indigo-100">
            <Volume2 size={17} />
          </div>

          Read Question
        </motion.button>

        {!listening ? (
          <motion.button
            type="button"
            onClick={startListening}
            whileHover={{
              y: -2,
            }}
            whileTap={{
              scale: 0.985,
            }}
            className="group flex items-center justify-center gap-3 rounded-[18px] border border-emerald-100 bg-emerald-50/70 px-5 py-4 text-sm font-bold text-emerald-700 transition-all duration-300 hover:border-emerald-200 hover:bg-emerald-100/70 hover:shadow-md"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-emerald-600 shadow-sm ring-1 ring-emerald-100">
              <Mic size={17} />
            </div>

            Start Speaking
          </motion.button>
        ) : (
          <motion.button
            type="button"
            onClick={stopListening}
            initial={{
              opacity: 0,
              scale: 0.98,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            whileHover={{
              y: -2,
            }}
            whileTap={{
              scale: 0.985,
            }}
            className="group flex items-center justify-center gap-3 rounded-[18px] border border-rose-100 bg-rose-50/80 px-5 py-4 text-sm font-bold text-rose-700 transition-all duration-300 hover:border-rose-200 hover:bg-rose-100/80 hover:shadow-md"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-rose-600 shadow-sm ring-1 ring-rose-100">
              <Square
                size={14}
                fill="currentColor"
              />
            </div>

            Stop Recording
          </motion.button>
        )}

      </div>

      {/* Listening status */}
      {listening && (
        <motion.div
          initial={{
            opacity: 0,
            y: 8,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="relative overflow-hidden rounded-[20px] border border-emerald-100 bg-emerald-50/60 p-4"
        >
          <div className="flex items-center gap-4">

            <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-emerald-600 shadow-sm ring-1 ring-emerald-100">

              <Radio
                size={18}
              />

              <motion.span
                animate={{
                  scale: [
                    0.7,
                    1.3,
                    0.7,
                  ],
                  opacity: [
                    0.7,
                    0,
                    0.7,
                  ],
                }}
                transition={{
                  duration: 1.7,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 rounded-xl border border-emerald-400"
              />

            </div>

            <div className="min-w-0 flex-1">

              <div className="flex flex-wrap items-center gap-2">

                <p className="text-sm font-bold text-emerald-800">
                  Listening to your
                  answer
                </p>

                <div className="flex items-end gap-1">
                  {[8, 14, 20, 12, 17].map(
                    (
                      height,
                      index
                    ) => (
                      <motion.span
                        key={index}
                        animate={{
                          height: [
                            5,
                            height,
                            7,
                          ],
                        }}
                        transition={{
                          duration:
                            0.7 +
                            index *
                            0.08,
                          repeat:
                            Infinity,
                          repeatType:
                            "reverse",
                          ease:
                            "easeInOut",
                        }}
                        className="w-1 rounded-full bg-emerald-500"
                      />
                    )
                  )}
                </div>

              </div>

              <p className="mt-1 text-xs leading-5 text-emerald-700/70">
                Speak clearly. Your
                words are being added
                automatically to the
                answer field.
              </p>

            </div>

          </div>
        </motion.div>
      )}

    </div>
  );
}

export default VoiceInterview;