import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
  useNavigate,
  useSearchParams,
  Link,
} from "react-router-dom";

import { motion } from "framer-motion";

import {
  CheckCircle2,
  XCircle,
  Mail,
  ArrowRight,
  RefreshCw,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import {
  verifyEmail,
  resendVerification,
} from "../../services/authService";

function VerifyEmail() {
  const { token: pathToken } =
    useParams();

  const [searchParams] =
    useSearchParams();

  const navigate =
    useNavigate();

  const token =
    pathToken ||
    searchParams.get("token");

  const [loading, setLoading] =
    useState(true);

  const [success, setSuccess] =
    useState(false);

  const [
    errorMessage,
    setErrorMessage,
  ] = useState("");

  const [
    emailInput,
    setEmailInput,
  ] = useState("");

  const [
    resendStatus,
    setResendStatus,
  ] = useState("");

  const [
    resendLoading,
    setResendLoading,
  ] = useState(false);

  const [
    resendCooldown,
    setResendCooldown,
  ] = useState(0);

  useEffect(() => {
    if (resendCooldown <= 0) {
      return;
    }

    const timer =
      setTimeout(() => {
        setResendCooldown(
          (prev) =>
            Math.max(
              prev - 1,
              0
            )
        );
      }, 1000);

    return () =>
      clearTimeout(timer);
  }, [resendCooldown]);

  useEffect(() => {
    let cancelled = false;

    const performVerification =
      async () => {
        if (!token) {
          if (!cancelled) {
            setErrorMessage(
              "Verification token is missing."
            );

            setLoading(false);
          }

          return;
        }

        try {
          setLoading(true);
          setErrorMessage("");
          setSuccess(false);

          const data =
            await verifyEmail(
              token
            );

          if (cancelled) {
            return;
          }

          if (data?.success) {
            setSuccess(true);
            setErrorMessage("");
          } else {
            setSuccess(false);

            setErrorMessage(
              data?.message ||
              "Verification failed."
            );
          }
        } catch (error) {
          if (cancelled) {
            return;
          }

          setSuccess(false);

          setErrorMessage(
            error?.response?.data
              ?.message ||
            error?.message ||
            "Invalid or expired verification link."
          );
        } finally {
          if (!cancelled) {
            setLoading(false);
          }
        }
      };

    performVerification();

    return () => {
      cancelled = true;
    };
  }, [token]);

  const handleResend =
    async (e) => {
      e.preventDefault();

      const email =
        emailInput
          .trim()
          .toLowerCase();

      if (!email) {
        setResendStatus(
          "Please enter your email address."
        );

        return;
      }

      try {
        setResendLoading(true);
        setResendStatus("");

        const data =
          await resendVerification(
            email
          );

        setResendStatus(
          data?.message ||
          "Verification email sent successfully."
        );

        setResendCooldown(
          60
        );
      } catch (error) {
        setResendStatus(
          error?.response?.data
            ?.message ||
          error?.message ||
          "Failed to resend verification email."
        );
      } finally {
        setResendLoading(
          false
        );
      }
    };

  const handleContinue =
    () => {
      const isLoggedIn =
        Boolean(
          localStorage.getItem(
            "token"
          )
        );

      if (isLoggedIn) {
        navigate(
          "/dashboard",
          {
            replace: true,
          }
        );
      } else {
        navigate(
          "/login",
          {
            replace: true,
          }
        );
      }
    };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white px-4 py-10">

      <div className="pointer-events-none absolute -left-32 top-[-100px] h-[430px] w-[430px] rounded-full bg-blue-100/50 blur-3xl" />

      <div className="pointer-events-none absolute -right-32 bottom-[-120px] h-[430px] w-[430px] rounded-full bg-indigo-100/40 blur-3xl" />

      <motion.div
        initial={{
          opacity: 0,
          y: 18,
          scale: 0.985,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        transition={{
          duration: 0.55,
          ease: [
            0.16,
            1,
            0.3,
            1,
          ],
        }}
        className="relative w-full max-w-xl overflow-hidden rounded-[34px] border border-slate-200/80 bg-white p-6 text-center shadow-[0_26px_85px_rgba(15,23,42,0.09)] sm:p-10"
      >
        <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-blue-100/35 blur-3xl" />

        <div className="relative">

          <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-blue-600">

            <Mail
              size={14}
            />

            CareerPilot AI

          </div>

          {loading ? (
            <div className="py-10">

              <div className="cp-ai-orb mx-auto">

                <ShieldCheck
                  size={23}
                  className="text-blue-600"
                />

              </div>

              <h2 className="mt-7 text-2xl font-bold tracking-[-0.03em] text-slate-950">

                Verifying your email

              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-500">

                Please wait while
                CareerPilot validates
                your verification link.

              </p>

              <div className="mt-5 flex justify-center">

                <div className="cp-thinking-dots">
                  <span />
                  <span />
                  <span />
                </div>

              </div>

            </div>
          ) : success ? (
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.97,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              className="py-8"
            >

              <motion.div
                initial={{
                  scale: 0.75,
                  opacity: 0,
                }}
                animate={{
                  scale: 1,
                  opacity: 1,
                }}
                transition={{
                  type: "spring",
                  stiffness: 220,
                  damping: 16,
                }}
                className="mx-auto flex h-20 w-20 items-center justify-center rounded-[26px] bg-emerald-50 text-emerald-600 shadow-[0_15px_40px_rgba(16,185,129,0.1)] ring-1 ring-emerald-100"
              >

                <CheckCircle2
                  size={42}
                />

              </motion.div>

              <div className="mt-7 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700 ring-1 ring-emerald-100">

                <Sparkles
                  size={12}
                />

                Verification Complete

              </div>

              <h2 className="mt-5 text-3xl font-bold tracking-[-0.035em] text-slate-950">

                Email Verified Successfully

              </h2>

              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500">

                Your CareerPilot AI
                account has been
                successfully verified
                and activated.

              </p>

              <motion.button
                type="button"
                onClick={
                  handleContinue
                }
                whileHover={{
                  y: -2,
                }}
                whileTap={{
                  scale: 0.985,
                }}
                className="cp-btn cp-btn-primary mt-7 w-full px-5 py-3.5"
              >

                Continue

                <ArrowRight
                  size={16}
                />

              </motion.button>

            </motion.div>
          ) : (
            <motion.div
              initial={{
                opacity: 0,
                y: 8,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="py-6"
            >

              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[26px] bg-rose-50 text-rose-600 ring-1 ring-rose-100">

                <XCircle
                  size={42}
                />

              </div>

              <h2 className="mt-6 text-3xl font-bold tracking-[-0.035em] text-slate-950">

                Verification Failed

              </h2>

              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500">

                {errorMessage}

              </p>

              <div className="mt-7 rounded-[22px] border border-slate-200 bg-slate-50/70 p-5 text-left">

                <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">

                  Request new
                  verification link

                </p>

                <form
                  onSubmit={
                    handleResend
                  }
                  className="mt-4 space-y-3"
                >

                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={
                      emailInput
                    }
                    onChange={(e) =>
                      setEmailInput(
                        e.target.value
                      )
                    }
                    className="cp-input px-4 py-3"
                    required
                  />

                  <button
                    type="submit"
                    disabled={
                      resendLoading ||
                      resendCooldown >
                      0
                    }
                    className="cp-btn cp-btn-primary w-full px-4 py-3"
                  >

                    {resendLoading
                      ? "Sending..."
                      : resendCooldown >
                        0
                        ? `Resend available in ${resendCooldown}s`
                        : (
                          <>
                            <RefreshCw
                              size={14}
                            />

                            Resend Email
                          </>
                        )}

                  </button>

                </form>

                {resendStatus && (
                  <p className="mt-3 text-center text-xs font-medium text-slate-600">

                    {resendStatus}

                  </p>
                )}

              </div>

              <div className="mt-6">

                <Link
                  to="/login"
                  className="text-sm font-bold text-blue-600 transition hover:text-blue-700"
                >

                  Back to Login

                </Link>

              </div>

            </motion.div>
          )}

        </div>

      </motion.div>

    </div>
  );
}

export default VerifyEmail;