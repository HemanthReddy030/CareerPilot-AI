import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Lottie } from "lottie-react";

import {
  Mail,
  RefreshCcw,
  CalendarDays,
  ArrowRight,
  Inbox,
  Sparkles,
  Link2,
  Clock3,
  CheckCircle2,
  Send,
} from "lucide-react";

import DashboardLayout from "../../layouts/DashboardLayout";
import { connectGoogle } from "../../services/googleService";
import { getJobEmails } from "../../services/gmailService";
import { createCalendarEvent } from "../../services/calendarService";

function Gmail() {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [emailAnimation, setEmailAnimation] = useState(null);

  const handleConnect = async () => {
    try {
      const data = await connectGoogle();
      window.location.href = data.url;
    } catch (error) {
      console.error(error);
      alert("Failed to connect Gmail.");
    }
  };

  const loadEmails = async () => {
    try {
      setLoading(true);

      const data = await getJobEmails();

      setEmails(data.emails || []);
    } catch (error) {
      console.error(error);
      alert("Failed to fetch emails.");
    } finally {
      setLoading(false);
    }
  };

  const handleCalendar = async (email) => {
    try {
      const start = new Date();

      const end = new Date(
        start.getTime() + 60 * 60 * 1000
      );

      const response =
        await createCalendarEvent({
          title:
            email.subject ||
            "Interview",

          description: `Interview invitation from ${email.from}`,

          start: start.toISOString(),

          end: end.toISOString(),
        });

      alert(response.message);
    } catch (error) {
      console.error(error);

      alert(
        "Failed to create calendar event."
      );
    }
  };

  useEffect(() => {
    loadEmails();

    const loadAnimation = async () => {
      try {
        const response = await fetch("/gifs/email.json");
        if (!response.ok) {
          throw new Error("Unable to load email animation.");
        }
        const data = await response.json();
        setEmailAnimation(data);
      } catch (error) {
        console.error("Failed to load email animation:", error);
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
                <Mail size={14} />

                Gmail Integration
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
                Turn interview emails

                <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  into career actions.
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
                Connect Gmail, review
                job-related emails and
                turn interview invitations
                into calendar events from
                one workspace.
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
                  <Inbox
                    size={17}
                    className="text-blue-600"
                  />

                  Interview Emails
                </div>

                <div className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm">
                  <CalendarDays
                    size={17}
                    className="text-indigo-600"
                  />

                  Calendar Sync
                </div>

                <div className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm">
                  <Sparkles
                    size={17}
                    className="text-emerald-600"
                  />

                  Smart Workflow
                </div>
              </motion.div>

              <motion.button
                type="button"
                onClick={handleConnect}
                initial={{
                  opacity: 0,
                  y: 10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.27,
                }}
                whileHover={{
                  y: -2,
                }}
                whileTap={{
                  scale: 0.985,
                }}
                className="cp-btn cp-btn-primary mt-7 px-6 py-3.5"
              >
                <Link2 size={17} />

                Connect Gmail

                <ArrowRight size={17} />
              </motion.button>
            </div>

            {/* MAIL ILLUSTRATION */}
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
                ease: [
                  0.16,
                  1,
                  0.3,
                  1,
                ],
              }}
              className="relative mx-auto w-full max-w-[450px]"
            >
              <div className="cp-image-shell relative overflow-hidden p-6">

                <motion.div
                  animate={{
                    y: [
                      0,
                      -6,
                      0,
                    ],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="relative mx-auto flex aspect-[4/3] items-center justify-center overflow-hidden rounded-[30px] border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-indigo-50"
                >

                  {emailAnimation ? (
                    <Lottie
                      src={emailAnimation}
                      loop={true}
                      autoplay={true}
                      rendererSettings={{
                        preserveAspectRatio: "xMidYMid meet",
                      }}
                      className="h-[250px] w-full max-w-[330px]"
                    />
                  ) : (
                    /* Envelope */
                    <div className="relative flex h-44 w-56 items-center justify-center overflow-hidden rounded-[28px] border border-blue-100 bg-white shadow-[0_26px_70px_rgba(37,99,235,0.12)]">

                      <div className="absolute inset-x-0 bottom-0 h-[65%] bg-gradient-to-br from-blue-50 to-indigo-50" />

                      <Mail
                        size={62}
                        className="relative text-blue-600"
                      />

                      <motion.div
                        animate={{
                          scale: [
                            1,
                            1.1,
                            1,
                          ],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                        }}
                        className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-full bg-rose-500 text-xs font-bold text-white shadow-lg"
                      >
                        {emails.length}
                      </motion.div>

                    </div>
                  )}

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
                  <Send size={20} />
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
                  <CalendarDays
                    size={20}
                  />
                </motion.div>

              </div>
            </motion.div>

          </div>
        </motion.section>

        {/* WORKSPACE */}
        <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">

          {/* EMAILS */}
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
            <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

              <div>
                <p className="cp-eyebrow">
                  Gmail Inbox
                </p>

                <h2 className="mt-2 text-2xl font-bold tracking-[-0.035em] text-slate-950">
                  Interview Emails
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  Review job-related
                  messages and schedule
                  interview events.
                </p>
              </div>

              <motion.button
                type="button"
                onClick={loadEmails}
                disabled={loading}
                whileHover={
                  loading
                    ? undefined
                    : { y: -2 }
                }
                whileTap={
                  loading
                    ? undefined
                    : { scale: 0.985 }
                }
                className="cp-btn cp-btn-secondary px-5 py-3 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <RefreshCcw
                  size={16}
                  className={
                    loading
                      ? "animate-spin"
                      : ""
                  }
                />

                {loading
                  ? "Syncing..."
                  : "Refresh"}
              </motion.button>

            </div>

            {/* LOADING */}
            {loading ? (
              <div className="space-y-4">
                {[...Array(4)].map(
                  (_, index) => (
                    <div
                      key={index}
                      className="relative overflow-hidden rounded-[22px] border border-slate-100 bg-slate-50 p-5"
                    >
                      <div className="animate-pulse">
                        <div className="h-4 w-[55%] rounded-full bg-slate-200" />

                        <div className="mt-4 h-3 w-[35%] rounded-full bg-slate-200" />

                        <div className="mt-3 h-3 w-[25%] rounded-full bg-slate-100" />
                      </div>
                    </div>
                  )
                )}
              </div>
            ) : emails.length === 0 ? (

              /* EMPTY */
              <motion.div
                initial={{
                  opacity: 0,
                  y: 10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                className="flex min-h-[320px] flex-col items-center justify-center rounded-[24px] border border-dashed border-slate-200 bg-gradient-to-br from-slate-50 via-white to-blue-50/50 p-8 text-center"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-[20px] bg-white text-blue-600 shadow-[0_12px_30px_rgba(37,99,235,0.08)] ring-1 ring-blue-100">
                  <Inbox size={28} />
                </div>

                <h3 className="mt-5 text-lg font-bold text-slate-900">
                  No interview emails
                  found
                </h3>

                <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
                  Connect Gmail or refresh
                  your inbox to check for
                  new job and interview
                  messages.
                </p>
              </motion.div>
            ) : (

              /* EMAIL CARDS */
              <div className="space-y-4">

                {emails.map(
                  (email, index) => (
                    <motion.div
                      key={email.id}
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
                          index * 0.04,
                      }}
                      whileHover={{
                        y: -2,
                      }}
                      className="group relative overflow-hidden rounded-[22px] border border-slate-200/80 bg-white p-5 shadow-[0_8px_30px_rgba(15,23,42,0.035)] transition-shadow duration-300 hover:shadow-[0_16px_45px_rgba(15,23,42,0.07)]"
                    >
                      <div className="pointer-events-none absolute -right-12 -top-12 h-28 w-28 rounded-full bg-blue-100/25 blur-3xl" />

                      <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                        <div className="flex min-w-0 items-start gap-4">

                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 ring-1 ring-blue-100">
                            <Mail
                              size={
                                20
                              }
                            />
                          </div>

                          <div className="min-w-0">

                            <h3 className="text-base font-bold leading-6 text-slate-900">
                              {email.subject ||
                                "Interview Email"}
                            </h3>

                            <p className="mt-2 truncate text-sm text-slate-500">
                              {
                                email.from
                              }
                            </p>

                            <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-500 ring-1 ring-slate-200/80">
                              <Clock3
                                size={
                                  12
                                }
                              />

                              {email.date ||
                                "Date unavailable"}
                            </div>

                          </div>
                        </div>

                        <motion.button
                          type="button"
                          onClick={() =>
                            handleCalendar(
                              email
                            )
                          }
                          whileHover={{
                            y: -1,
                          }}
                          whileTap={{
                            scale:
                              0.985,
                          }}
                          className="cp-btn bg-emerald-600 px-4 py-2.5 text-sm text-white shadow-sm hover:bg-emerald-700"
                        >
                          <CalendarDays
                            size={16}
                          />

                          Add Event
                        </motion.button>

                      </div>
                    </motion.div>
                  )
                )}

              </div>
            )}

          </motion.section>

          {/* SYNC STATUS */}
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
            className="space-y-5"
          >

            <div className="rounded-[28px] border border-slate-200/80 bg-white p-6 shadow-[0_16px_50px_rgba(15,23,42,0.05)]">

              <p className="cp-eyebrow">
                Integration
              </p>

              <h2 className="mt-2 text-xl font-bold text-slate-950">
                Sync Status
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Keep your Gmail and
                interview workflow
                organized.
              </p>

              <div className="mt-6 rounded-[22px] border border-blue-100 bg-blue-50/60 p-5">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm ring-1 ring-blue-100">
                    <Mail size={18} />
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.15em] text-blue-600">
                      Google
                    </p>

                    <p className="mt-1 font-bold text-slate-900">
                      Gmail
                    </p>
                  </div>

                </div>

                <p className="mt-4 text-sm leading-6 text-slate-500">
                  Connect your Google
                  account to retrieve
                  interview-related
                  emails.
                </p>

              </div>

            </div>

            {/* Calendar */}
            <div className="rounded-[28px] border border-slate-200/80 bg-white p-6 shadow-[0_16px_50px_rgba(15,23,42,0.05)]">

              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 ring-1 ring-indigo-100">
                <CalendarDays
                  size={20}
                />
              </div>

              <h3 className="mt-5 text-lg font-bold text-slate-900">
                Calendar Workflow
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Found an interview
                invitation? Add it to your
                calendar directly from the
                email card.
              </p>

              <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-emerald-600">
                <CheckCircle2
                  size={16}
                />

                One-click event creation
              </div>

            </div>

          </motion.aside>

        </div>

      </div>
    </DashboardLayout>
  );
}

export default Gmail;