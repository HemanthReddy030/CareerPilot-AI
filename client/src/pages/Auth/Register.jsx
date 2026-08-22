import { useState } from "react";
import {
  useNavigate,
  Link,
} from "react-router-dom";

import { motion } from "framer-motion";

import {
  UserPlus,
  CheckCircle2,
  UserRound,
  Mail,
  Lock,
  ArrowRight,
  Sparkles,
  Briefcase,
  BrainCircuit,
  FileText,
  Eye,
  EyeOff,
} from "lucide-react";

import {
  registerUser,
} from "../../services/authService";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({
      fullName: "",
      email: "",
      password: "",
    });

  const [loading, setLoading] =
    useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data =
        await registerUser(
          formData
        );

      alert(data.message);

      navigate("/login");
    } catch (error) {
      alert(
        error.response?.data
          ?.message ||
        "Registration Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-white px-4 py-8 sm:px-6 lg:px-8">

      <div className="pointer-events-none absolute -left-36 bottom-[-100px] h-[430px] w-[430px] rounded-full bg-indigo-100/40 blur-3xl" />

      <div className="pointer-events-none absolute -right-32 top-[-100px] h-[420px] w-[420px] rounded-full bg-blue-100/50 blur-3xl" />

      <div className="relative mx-auto grid min-h-[calc(100vh-64px)] max-w-7xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">

        {/* VISUAL */}
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
          }}
          className="relative hidden overflow-hidden rounded-[36px] border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-10 lg:block"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-blue-600 shadow-sm">
            <Sparkles size={14} />
            CareerPilot AI
          </div>

          <h1 className="mt-7 max-w-xl text-5xl font-bold tracking-[-0.045em] text-slate-950">
            Start building a
            <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              smarter career journey.
            </span>
          </h1>

          <p className="mt-5 max-w-xl text-base leading-8 text-slate-500">
            Create your CareerPilot account and organize applications,
            resumes, interviews, and career progress in one workspace.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              {
                icon: Briefcase,
                title: "Job Tracking",
              },
              {
                icon: FileText,
                title: "Resume Tools",
              },
              {
                icon: BrainCircuit,
                title: "Interview AI",
              },
            ].map(
              (item, index) => {
                const Icon =
                  item.icon;

                return (
                  <motion.div
                    key={
                      item.title
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
                        0.16 +
                        index * 0.07,
                    }}
                    whileHover={{
                      y: -3,
                    }}
                    className="rounded-[22px] border border-white bg-white/85 p-5 shadow-[0_12px_35px_rgba(15,23,42,0.05)]"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 ring-1 ring-blue-100">
                      <Icon
                        size={19}
                      />
                    </div>

                    <p className="mt-4 text-sm font-bold text-slate-800">
                      {item.title}
                    </p>
                  </motion.div>
                );
              }
            )}
          </div>

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
            className="mt-10 rounded-[28px] border border-white bg-white/90 p-6 shadow-[0_22px_60px_rgba(37,99,235,0.1)]"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100">
                <CheckCircle2
                  size={25}
                />
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-600">
                  Your Workspace
                </p>

                <p className="mt-1 font-bold text-slate-900">
                  Smart tracking,
                  resume tools and AI
                  interview preparation.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* FORM */}
        <motion.form
          onSubmit={
            handleSubmit
          }
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
          }}
          className="mx-auto w-full max-w-xl rounded-[32px] border border-slate-200/80 bg-white p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] sm:p-9"
        >
          <div className="text-center">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 text-blue-600 ring-1 ring-blue-100">
              <UserPlus
                size={24}
              />
            </div>

            <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
              Register
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-[-0.035em] text-slate-950">
              Create your account
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-500">
              Create your CareerPilot
              workspace and start
              organizing your job search.
            </p>

          </div>

          <div className="mt-8 space-y-5">

            <label className="block">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Full Name
              </span>

              <div className="relative mt-2">
                <UserRound
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  name="fullName"
                  placeholder="John Doe"
                  value={
                    formData.fullName
                  }
                  onChange={
                    handleChange
                  }
                  className="cp-input py-3.5 pl-11 pr-4"
                  required
                />
              </div>
            </label>

            <label className="block">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Email Address
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
                  value={
                    formData.email
                  }
                  onChange={
                    handleChange
                  }
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
                  placeholder="Create a password"
                  value={
                    formData.password
                  }
                  onChange={
                    handleChange
                  }
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
              disabled={
                loading
              }
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
              className="cp-btn cp-btn-primary w-full px-5 py-3.5"
            >
              {loading
                ? "Creating account..."
                : "Create account"}

              {!loading && (
                <ArrowRight
                  size={17}
                />
              )}
            </motion.button>

          </div>

          <p className="mt-7 text-center text-sm text-slate-500">
            Already have an
            account?{" "}

            <Link
              to="/login"
              className="font-bold text-blue-600 transition hover:text-blue-700"
            >
              Login
            </Link>
          </p>

        </motion.form>

      </div>
    </div>
  );
}

export default Register;