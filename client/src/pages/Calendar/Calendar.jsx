import { useState } from "react";
import { motion } from "framer-motion";

import {
  CalendarDays,
  Clock3,
  Sparkles,
  PlusCircle,
  Video,
  BellRing,
  CheckCircle2,
  CircleAlert,
  ArrowRight,
  CalendarCheck2,
} from "lucide-react";

import DashboardLayout from "../../layouts/DashboardLayout";
import { createCalendarEvent } from "../../services/calendarService";

function Calendar() {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreateEvent = async () => {
    try {
      setLoading(true);
      setStatus("Creating calendar event...");

      const now = new Date();
      const start = new Date(
        now.getTime() + 5 * 60 * 1000
      );
      const end = new Date(
        now.getTime() + 65 * 60 * 1000
      );

      const data =
        await createCalendarEvent({
          title: "CareerPilot Test Event",
          description:
            "This event was created from the CareerPilot Calendar page.",
          start: start.toISOString(),
          end: end.toISOString(),
        });

      setStatus(
        data.message ||
        "Calendar event created successfully."
      );
    } catch (error) {
      console.error(error);

      setStatus(
        error.response?.data?.message ||
        "Failed to create calendar event. Please connect Google first."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleScheduleInterviewEvent =
    async () => {
      try {
        setLoading(true);

        setStatus(
          "Scheduling interview event..."
        );

        const now = new Date();

        const start = new Date(
          now.getTime() +
          24 * 60 * 60 * 1000
        );

        const end = new Date(
          now.getTime() +
          25 * 60 * 60 * 1000
        );

        const data =
          await createCalendarEvent({
            title:
              "AI Interview Practice Session",

            description:
              "Prepare for your interview with CareerPilot. Add notes, join the call on time, and review your prep materials.",

            start: start.toISOString(),

            end: end.toISOString(),

            meetingLink:
              "https://meet.google.com/new",

            location: "Online",
          });

        setStatus(
          data.message ||
          `Interview event scheduled. Open in calendar: ${data.calendarLink}`
        );
      } catch (error) {
        console.error(error);

        setStatus(
          error.response?.data?.message ||
          "Failed to schedule interview event. Please connect Google first."
        );
      } finally {
        setLoading(false);
      }
    };

  const isError =
    status &&
    status.toLowerCase().includes("failed");

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
                <CalendarDays size={14} />
                Google Calendar
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
                Keep every interview
                <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  perfectly on schedule.
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
                Create career events,
                schedule interview practice
                sessions, and keep important
                preparation time organized
                through Google Calendar.
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
                  <CalendarCheck2
                    size={17}
                    className="text-blue-600"
                  />

                  Event Planning
                </div>

                <div className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm">
                  <BellRing
                    size={17}
                    className="text-indigo-600"
                  />

                  Interview Reminders
                </div>

                <div className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm">
                  <Video
                    size={17}
                    className="text-emerald-600"
                  />

                  Online Sessions
                </div>
              </motion.div>
            </div>

            {/* CALENDAR ILLUSTRATION */}
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
                  className="relative mx-auto flex aspect-[4/3] items-center justify-center rounded-[30px] border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-indigo-50"
                >
                  <div className="relative w-[230px] overflow-hidden rounded-[28px] border border-blue-100 bg-white shadow-[0_26px_70px_rgba(37,99,235,0.12)]">

                    <div className="flex items-center justify-between bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-4 text-white">
                      <div>
                        <p className="text-xs font-semibold text-blue-100">
                          CareerPilot
                        </p>

                        <p className="text-lg font-bold">
                          Calendar
                        </p>
                      </div>

                      <CalendarDays
                        size={24}
                      />
                    </div>

                    <div className="grid grid-cols-7 gap-1 p-4 text-center">
                      {Array.from({
                        length: 28,
                      }).map(
                        (_, index) => (
                          <div
                            key={index}
                            className={`flex aspect-square items-center justify-center rounded-lg text-[10px] font-semibold ${index ===
                                16
                                ? "bg-blue-600 text-white shadow-md"
                                : "text-slate-400"
                              }`}
                          >
                            {index +
                              1}
                          </div>
                        )
                      )}
                    </div>

                    <div className="mx-4 mb-4 rounded-xl bg-blue-50 px-3 py-2.5">
                      <div className="flex items-center gap-2">
                        <Clock3
                          size={13}
                          className="text-blue-600"
                        />

                        <p className="text-[10px] font-semibold text-blue-700">
                          Interview Practice
                        </p>
                      </div>
                    </div>

                  </div>
                </motion.div>

                <motion.div
                  animate={{
                    y: [0, -5, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute left-8 top-8 rounded-2xl border border-white/90 bg-white/90 p-3 text-blue-600 shadow-lg backdrop-blur"
                >
                  <BellRing size={20} />
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
                  className="absolute bottom-8 right-8 rounded-2xl border border-white/90 bg-white/90 p-3 text-indigo-600 shadow-lg backdrop-blur"
                >
                  <Sparkles size={20} />
                </motion.div>

              </div>
            </motion.div>

          </div>
        </motion.section>

        {/* ACTIONS */}
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">

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
              delay: 0.1,
            }}
            className="rounded-[28px] border border-slate-200/80 bg-white p-6 shadow-[0_16px_50px_rgba(15,23,42,0.05)] sm:p-8"
          >
            <div className="mb-7">
              <p className="cp-eyebrow">
                Quick Actions
              </p>

              <h2 className="mt-2 text-2xl font-bold tracking-[-0.035em] text-slate-950">
                Create Calendar Events
              </h2>

              <p className="mt-2 max-w-lg text-sm leading-6 text-slate-500">
                Create events for career
                planning or schedule an
                interview practice session
                directly from CareerPilot.
              </p>
            </div>

            <div className="space-y-4">

              {/* TEST EVENT */}
              <div className="rounded-[22px] border border-blue-100 bg-blue-50/45 p-5">
                <div className="flex items-start gap-4">

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-blue-600 shadow-sm ring-1 ring-blue-100">
                    <PlusCircle
                      size={20}
                    />
                  </div>

                  <div className="flex-1">
                    <h3 className="font-bold text-slate-900">
                      CareerPilot Test Event
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-slate-500">
                      Create a test
                      calendar event starting
                      five minutes from now.
                    </p>
                  </div>

                </div>

                <motion.button
                  type="button"
                  onClick={
                    handleCreateEvent
                  }
                  disabled={loading}
                  whileHover={
                    loading
                      ? undefined
                      : {
                        y: -2,
                      }
                  }
                  whileTap={
                    loading
                      ? undefined
                      : {
                        scale:
                          0.985,
                      }
                  }
                  className="cp-btn cp-btn-primary mt-5 w-full px-5 py-3.5"
                >
                  <CalendarDays
                    size={17}
                  />

                  {loading
                    ? "Creating event..."
                    : "Create Test Event"}

                  {!loading && (
                    <ArrowRight
                      size={16}
                    />
                  )}
                </motion.button>
              </div>

              {/* INTERVIEW */}
              <div className="rounded-[22px] border border-emerald-100 bg-emerald-50/45 p-5">

                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-emerald-600 shadow-sm ring-1 ring-emerald-100">
                    <Video size={20} />
                  </div>

                  <div className="flex-1">
                    <h3 className="font-bold text-slate-900">
                      AI Interview Practice
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-slate-500">
                      Schedule a one-hour
                      preparation session for
                      tomorrow.
                    </p>
                  </div>
                </div>

                <motion.button
                  type="button"
                  onClick={
                    handleScheduleInterviewEvent
                  }
                  disabled={loading}
                  whileHover={
                    loading
                      ? undefined
                      : {
                        y: -2,
                      }
                  }
                  whileTap={
                    loading
                      ? undefined
                      : {
                        scale:
                          0.985,
                      }
                  }
                  className="cp-btn mt-5 w-full bg-emerald-600 px-5 py-3.5 font-semibold text-white shadow-sm hover:bg-emerald-700"
                >
                  <CalendarCheck2
                    size={17}
                  />

                  {loading
                    ? "Scheduling event..."
                    : "Schedule Interview Session"}
                </motion.button>

              </div>

            </div>

            {/* STATUS */}
            {status && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 8,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                className={`mt-6 flex items-start gap-3 rounded-[20px] border p-4 ${isError
                    ? "border-rose-100 bg-rose-50/70"
                    : "border-blue-100 bg-blue-50/70"
                  }`}
              >
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ${isError
                      ? "text-rose-600 ring-rose-100"
                      : "text-blue-600 ring-blue-100"
                    }`}
                >
                  {isError ? (
                    <CircleAlert
                      size={17}
                    />
                  ) : (
                    <CheckCircle2
                      size={17}
                    />
                  )}
                </div>

                <p
                  className={`pt-1 text-sm leading-6 ${isError
                      ? "text-rose-700"
                      : "text-slate-600"
                    }`}
                >
                  {status}
                </p>
              </motion.div>
            )}

          </motion.section>

          {/* TIPS */}
          <motion.aside
            initial={{
              opacity: 0,
              y: 18,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.16,
            }}
            className="rounded-[28px] border border-slate-200/80 bg-white p-6 shadow-[0_16px_50px_rgba(15,23,42,0.05)] sm:p-8"
          >
            <p className="cp-eyebrow">
              Smart Scheduling
            </p>

            <h2 className="mt-2 text-2xl font-bold tracking-[-0.035em] text-slate-950">
              Calendar Tips
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              A few simple habits can
              make interview preparation
              much easier.
            </p>

            <div className="mt-7 space-y-4">

              {[
                {
                  icon: CalendarDays,
                  title:
                    "Connect Google Calendar",
                  text:
                    "Keep CareerPilot events synchronized with your Google account.",
                },
                {
                  icon: BellRing,
                  title:
                    "Use reminders",
                  text:
                    "Schedule reminders before interviews and follow-up tasks.",
                },
                {
                  icon: Video,
                  title:
                    "Practice before interviews",
                  text:
                    "Block dedicated preparation sessions before important interviews.",
                },
                {
                  icon: Sparkles,
                  title:
                    "Add preparation notes",
                  text:
                    "Keep interview context and preparation details inside event descriptions.",
                },
              ].map(
                (
                  item,
                  index
                ) => {
                  const Icon =
                    item.icon;

                  return (
                    <motion.div
                      key={
                        item.title
                      }
                      initial={{
                        opacity:
                          0,
                        x: 10,
                      }}
                      animate={{
                        opacity:
                          1,
                        x: 0,
                      }}
                      transition={{
                        delay:
                          0.2 +
                          index *
                          0.06,
                      }}
                      className="flex gap-4 rounded-[20px] border border-slate-100 bg-slate-50/65 p-4"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm ring-1 ring-slate-200/70">
                        <Icon
                          size={
                            17
                          }
                        />
                      </div>

                      <div>
                        <p className="text-sm font-bold text-slate-800">
                          {
                            item.title
                          }
                        </p>

                        <p className="mt-1 text-xs leading-5 text-slate-500">
                          {
                            item.text
                          }
                        </p>
                      </div>
                    </motion.div>
                  );
                }
              )}

            </div>
          </motion.aside>

        </div>

      </div>
    </DashboardLayout>
  );
}

export default Calendar;