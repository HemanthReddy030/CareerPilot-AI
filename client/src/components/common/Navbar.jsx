import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  LayoutGrid,
} from "lucide-react";

function HomeNavbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/85 backdrop-blur-2xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">

        {/* BRAND */}
        <Link
          to="/"
          className="group flex items-center gap-3"
        >
          <motion.div
            whileHover={{
              rotate: 5,
              scale: 1.04,
            }}
            className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 text-white shadow-[0_10px_30px_rgba(37,99,235,0.22)]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />

            <LayoutGrid
              size={19}
              className="relative"
            />
          </motion.div>

          <div>
            <div className="flex items-center gap-1.5">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-blue-600">
                CareerPilot
              </p>

              <Sparkles
                size={11}
                className="text-indigo-500"
              />
            </div>

            <p className="text-base font-bold tracking-[-0.025em] text-slate-950">
              CareerPilot AI
            </p>
          </div>
        </Link>

        {/* NAVIGATION */}
        <nav className="flex items-center gap-2 sm:gap-4">

          <Link
            to="/"
            className="hidden rounded-xl px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-slate-950 sm:block"
          >
            Home
          </Link>

          <Link
            to="/login"
            className="rounded-xl px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-slate-950"
          >
            Login
          </Link>

          <motion.div
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link
              to="/register"
              className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_8px_25px_rgba(15,23,42,0.14)] transition hover:bg-blue-600"
            >
              Sign Up

              <ArrowRight size={15} />
            </Link>
          </motion.div>

        </nav>
      </div>
    </header>
  );
}

export default HomeNavbar;