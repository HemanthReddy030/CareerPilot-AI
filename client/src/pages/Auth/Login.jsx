import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Lottie } from "lottie-react";

import {
  Lock,
  Mail,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  BriefcaseBusiness,
  CalendarDays,
  BrainCircuit,
  RefreshCw,
  Eye,
  EyeOff,
} from "lucide-react";

import {
  loginUser,
  resendVerification,
  socialLoginUser,
} from "../../services/authService";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginAnimation, setLoginAnimation] = useState(null);
  const [successMsg, setSuccessMsg] = useState("");
  const [savedUser, setSavedUser] = useState(null);
  const [useSavedSession, setUseSavedSession] = useState(false);

  const [errorMsg, setErrorMsg] = useState("");
  const [showResend, setShowResend] = useState(false);
  const [resendStatus, setResendStatus] = useState("");
  const [resendLoading, setResendLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  useEffect(() => {
    let timer;

    if (resendCooldown > 0) {
      timer = setTimeout(() => {
        setResendCooldown((prev) => prev - 1);
      }, 1000);
    }

    return () => clearTimeout(timer);
  }, [resendCooldown]);

  useEffect(() => {
    const loadAnimation = async () => {
      try {
        const response = await fetch("/gifs/Login.json");
        if (!response.ok) {
          throw new Error("Unable to load login animation.");
        }
        const data = await response.json();
        setLoginAnimation(data);
      } catch (error) {
        console.error("Failed to load login animation:", error);
      }
    };
    loadAnimation();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userStr = localStorage.getItem("user");
    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);
        setSavedUser(user);
        setUseSavedSession(true);
      } catch (e) {
        console.error("Failed to parse saved user:", e);
      }
    }
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setErrorMsg("");
      setShowResend(false);
      setResendStatus("");

      const data = await loginUser(formData);

      localStorage.setItem("token", data.token);

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      setSuccessMsg(data.message || "Login Successful! Redirecting...");

      setTimeout(() => {
        navigate("/dashboard");
      }, 1200);
    } catch (error) {
      const isUnverified =
        error.response?.data?.requiresVerification;

      if (isUnverified) {
        setErrorMsg(
          "Please verify your email address before continuing."
        );

        setShowResend(true);
      } else {
        setErrorMsg(
          error.response?.data?.message ||
          "Login Failed"
        );

        setShowResend(false);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (email, fullName) => {
    try {
      setErrorMsg("");
      setSuccessMsg("");
      setLoading(true);

      const data = await socialLoginUser({ email, fullName });

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setSuccessMsg("Login Successful! Redirecting...");
      setTimeout(() => {
        navigate("/dashboard");
      }, 1200);
    } catch (err) {
      console.error(err);
      setErrorMsg(err.response?.data?.message || "Social login failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async (e) => {
    e.preventDefault();

    if (!formData.email) {
      alert(
        "Please enter your email address first."
      );

      return;
    }

    try {
      setResendLoading(true);
      setResendStatus("");

      const data =
        await resendVerification(
          formData.email
        );

      setResendStatus(
        data.message ||
        "Verification email sent successfully."
      );

      setResendCooldown(60);
    } catch (err) {
      setResendStatus(
        err.response?.data?.message ||
        "Failed to resend verification email."
      );
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-white px-4 py-8 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute -left-32 top-0 h-[420px] w-[420px] rounded-full bg-blue-100/50 blur-3xl" />

      <div className="pointer-events-none absolute -right-36 bottom-0 h-[430px] w-[430px] rounded-full bg-indigo-100/40 blur-3xl" />

      <div className="relative mx-auto grid min-h-[calc(100vh-64px)] max-w-7xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">

        {/* LEFT VISUAL */}
        <motion.section
          initial={{
            opacity: 0,
            x: -18,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.65,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="relative hidden overflow-hidden rounded-[36px] border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-10 lg:block"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-blue-600 shadow-sm">
            <Sparkles size={14} />
            CareerPilot AI
          </div>

          <h1 className="mt-7 max-w-xl text-5xl font-bold tracking-[-0.045em] text-slate-950">
            Welcome back to your
            <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              career workspace.
            </span>
          </h1>

          <p className="mt-5 max-w-xl text-base leading-8 text-slate-500">
            Track applications, prepare for interviews, manage your resume,
            and keep every opportunity organized.
          </p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.16, duration: 0.5 }}
            className="mt-8 flex justify-center items-center"
          >
            {loginAnimation ? (
              <Lottie
                src={loginAnimation}
                loop={true}
                autoplay={true}
                rendererSettings={{
                  preserveAspectRatio: "xMidYMid meet",
                }}
                className="h-[280px] w-full max-w-[340px]"
              />
            ) : (
              <div className="h-[280px] w-full max-w-[340px] flex items-center justify-center bg-slate-50/50 rounded-2xl border border-dashed border-slate-200 text-xs text-slate-400">
                Loading animation...
              </div>
            )}
          </motion.div>

          <motion.div
            animate={{
              y: [0, -6, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="mt-10 rounded-[28px] border border-white bg-white/90 p-6 shadow-[0_22px_60px_rgba(37,99,235,0.1)]"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 ring-1 ring-blue-100">
                <ShieldCheck size={25} />
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-600">
                  Secure Access
                </p>

                <p className="mt-1 font-bold text-slate-900">
                  Your account stays protected.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* LOGIN CARD */}
        <motion.section
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
            ease: [0.16, 1, 0.3, 1],
          }}
          className="mx-auto w-full max-w-xl rounded-[32px] border border-slate-200/80 bg-white p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] sm:p-9"
        >
          {successMsg && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 rounded-[20px] border border-emerald-100 bg-emerald-50/80 p-4 text-sm text-emerald-700 text-center font-bold"
            >
              {successMsg}
            </motion.div>
          )}

          {useSavedSession && savedUser ? (
            <div className="text-center py-4">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-bold text-2xl shadow-[0_8px_30px_rgb(59,130,246,0.2)]">
                {savedUser.fullName ? savedUser.fullName.charAt(0).toUpperCase() : "U"}
              </div>

              <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
                Welcome Back
              </p>

              <h2 className="mt-2 text-2xl font-bold tracking-[-0.035em] text-slate-950">
                {savedUser.fullName}
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                {savedUser.email}
              </p>

              <div className="mt-8 space-y-4">
                <button
                  type="button"
                  onClick={() => {
                    setSuccessMsg("Welcome back! Redirecting...");
                    setTimeout(() => {
                      navigate("/dashboard");
                    }, 1200);
                  }}
                  className="cp-btn cp-btn-primary w-full px-5 py-3.5 flex justify-center items-center gap-2"
                >
                  Continue to Dashboard
                  <ArrowRight size={17} />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                    setSavedUser(null);
                    setUseSavedSession(false);
                  }}
                  className="w-full text-center text-sm font-semibold text-slate-500 hover:text-slate-700 py-3 border border-dashed border-slate-200 rounded-[20px] transition"
                >
                  Sign in with a different account
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 text-blue-600 ring-1 ring-blue-100">
                  <Mail size={24} />
                </div>

                <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
                  Sign In
                </p>

                <h2 className="mt-2 text-3xl font-bold tracking-[-0.035em] text-slate-950">
                  Login to CareerPilot
                </h2>

                <p className="mt-3 text-sm leading-6 text-slate-500">
                  Continue to your intelligent career dashboard.
                </p>
              </div>

              {errorMsg && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-7 rounded-[20px] border border-rose-100 bg-rose-50/80 p-4 text-sm text-rose-700"
                >
                  <p className="font-semibold">{errorMsg}</p>
                  {showResend && (
                    <div className="mt-3">
                      <button
                        type="button"
                        onClick={handleResend}
                        disabled={resendLoading || resendCooldown > 0}
                        className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 transition hover:text-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <RefreshCw size={13} />
                        {resendLoading
                          ? "Sending..."
                          : resendCooldown > 0
                            ? `Resend available in ${resendCooldown}s`
                            : "Resend Verification Email"}
                      </button>
                      {resendStatus && (
                        <p className="mt-2 text-xs font-medium text-slate-500">
                          {resendStatus}
                        </p>
                      )}
                    </div>
                  )}
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                <label className="block">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Email
                  </span>

                  <div className="relative mt-2">
                    <Mail
                      size={16}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="cp-input py-3.5 pl-11 pr-4"
                      required
                    />
                  </div>
                </label>

                <label className="block">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Password
                  </span>

                  <div className="relative mt-2">
                    <Lock
                      size={16}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Enter password"
                      value={formData.password}
                      onChange={handleChange}
                      className="cp-input py-3.5 pl-11 pr-12"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </label>

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={loading ? undefined : { y: -2 }}
                  whileTap={loading ? undefined : { scale: 0.985 }}
                  className="cp-btn cp-btn-primary w-full px-5 py-3.5"
                >
                  {loading ? "Signing in..." : "Sign in"}
                  {!loading && <ArrowRight size={17} />}
                </motion.button>
              </form>

              {/* Social Logins */}
              <div className="mt-6">
                <div className="relative flex items-center justify-center">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-200/80"></div>
                  </div>
                  <span className="relative bg-white px-3 text-xs uppercase tracking-wider text-slate-400 font-semibold">
                    Or continue with
                  </span>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => handleSocialLogin("google@example.com", "Google User")}
                    className="flex items-center justify-center gap-2.5 rounded-[20px] border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 hover:border-slate-300"
                  >
                    <svg className="h-4 w-4" viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21.35,11.1H12v2.7h5.38c-0.24,1.28 -0.96,2.37 -2.04,3.1v2.57h3.3c1.93,-1.78 3.04,-4.4 3.04,-7.4C21.68,11.75 21.57,11.4 21.35,11.1z" fill="#4285F4" />
                      <path d="M12,20.6c2.43,0 4.47,-0.8 5.96,-2.19l-3.3,-2.57c-0.9,0.6 -2.07,0.97 -3.3,0.97c-2.34,0 -4.33,-1.58 -5.04,-3.7H2.9v2.66c1.48,2.94 4.52,4.83 8.1,4.83z" fill="#34A853" />
                      <path d="M6.96,13.1c-0.18,-0.54 -0.28,-1.11 -0.28,-1.7c0,-0.59 0.1,-1.16 0.28,-1.7V7.04H2.9C2.3,8.23 2,9.58 2,11c0,1.42 0.3,2.77 0.9,3.96L6.96,13.1z" fill="#FBBC05" />
                      <path d="M12,6.15c1.32,0 2.5,0.45 3.44,1.35l2.58,-2.58C16.46,3.47 14.43,2.6 12,2.6c-3.58,0 -6.62,1.89 -8.1,4.83l4.06,3.15c0.71,-2.12 2.7,-3.7 5.04,-3.7z" fill="#EA4335" />
                    </svg>
                    Google
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSocialLogin("apple@example.com", "Apple User")}
                    className="flex items-center justify-center gap-2.5 rounded-[20px] border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 hover:border-slate-300"
                  >
                    <svg className="h-4 w-4" viewBox="0 0 24 24" width="24" height="24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.1,16.67C20.08,16.74 19.67,18.11 18.71,19.5M15.97,4.17C16.63,3.37 17.07,2.28 16.95,1C16,1.04 14.9,1.6 14.24,2.38C13.68,3.04 13.19,4.14 13.34,5.39C14.39,5.47 15.4,4.88 15.97,4.17Z" />
                    </svg>
                    Apple
                  </button>
                </div>
              </div>

              <p className="mt-7 text-center text-sm text-slate-500">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="font-bold text-blue-600 transition hover:text-blue-700"
                >
                  Create one
                </Link>
              </p>
            </>
          )}
        </motion.section>

      </div>
    </div>
  );
}

export default Login;