import { NavLink } from "react-router-dom";
import {
  Home,
  Briefcase,
  FileText,
  Cpu,
  Calendar,
  Mail,
  ChartBar,
  Settings,
  LayoutGrid,
  Menu,
  Sparkles,
  ChevronRight,
} from "lucide-react";

const menuItems = [
  { name: "Dashboard", icon: <Home size={19} />, path: "/dashboard" },
  { name: "Jobs", icon: <Briefcase size={19} />, path: "/jobs" },
  { name: "Resume", icon: <FileText size={19} />, path: "/resume" },
  { name: "AI Interview", icon: <Cpu size={19} />, path: "/ai-interview" },
  { name: "Calendar", icon: <Calendar size={19} />, path: "/calendar" },
  { name: "Gmail", icon: <Mail size={19} />, path: "/gmail" },
  { name: "Analytics", icon: <ChartBar size={19} />, path: "/analytics" },
  { name: "Settings", icon: <Settings size={19} />, path: "/settings" },
];

function Sidebar({ collapsed, onToggle }) {
  return (
    <aside
      className={`fixed left-0 top-0 z-40 hidden h-screen flex-col border-r border-slate-200/70 bg-white/90 backdrop-blur-2xl transition-[width] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:flex ${collapsed ? "w-20" : "w-72"
        }`}
    >
      {/* subtle sidebar glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-20 -top-20 h-56 w-56 rounded-full bg-blue-100/45 blur-3xl" />
        <div className="absolute -bottom-28 right-[-80px] h-64 w-64 rounded-full bg-indigo-100/30 blur-3xl" />
      </div>

      {/* Brand */}
      <div
        className={`relative flex h-24 shrink-0 items-center border-b border-slate-200/60 ${collapsed ? "justify-center px-2" : "justify-between px-5"
          }`}
      >
        <div className="flex min-w-0 items-center gap-3">
          <div className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 text-white shadow-[0_10px_30px_rgba(37,99,235,0.22)]">
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
            <LayoutGrid className="relative" size={20} />
          </div>

          {!collapsed && (
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <p className="truncate text-[11px] font-bold uppercase tracking-[0.2em] text-blue-600">
                  CareerPilot
                </p>
                <Sparkles size={11} className="text-indigo-500" />
              </div>

              <h1 className="mt-0.5 truncate text-lg font-bold tracking-[-0.03em] text-slate-950">
                Career Dashboard
              </h1>
            </div>
          )}
        </div>

        {!collapsed && (
          <button
            type="button"
            onClick={onToggle}
            className="group flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200/80 bg-white text-slate-500 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 hover:shadow-md"
            aria-label="Collapse sidebar"
          >
            <Menu
              size={17}
              className="transition-transform duration-300 group-hover:scale-105"
            />
          </button>
        )}
      </div>

      {/* Collapsed toggle */}
      {collapsed && (
        <div className="relative flex justify-center px-2 pt-4">
          <button
            type="button"
            onClick={onToggle}
            className="group flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 shadow-sm transition-all duration-200 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 hover:shadow-md"
            aria-label="Expand sidebar"
          >
            <Menu
              size={17}
              className="transition-transform duration-300 group-hover:scale-105"
            />
          </button>
        </div>
      )}

      {/* Navigation */}
      <nav
        className={`relative flex-1 overflow-y-auto py-5 ${collapsed ? "px-2" : "px-3"
          }`}
      >
        {!collapsed && (
          <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400">
            Workspace
          </p>
        )}

        <div className="space-y-1.5">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              title={collapsed ? item.name : undefined}
              className={({ isActive }) =>
                `group relative flex items-center overflow-hidden rounded-2xl transition-all duration-300 ${collapsed
                  ? "h-12 justify-center"
                  : "min-h-12 gap-3 px-3.5 py-2.5"
                } ${isActive
                  ? "bg-gradient-to-r from-blue-50 via-blue-50/80 to-indigo-50/70 text-blue-700 shadow-[inset_0_0_0_1px_rgba(147,197,253,0.35)]"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <span className="absolute left-0 top-1/2 h-6 w-[3px] -translate-y-1/2 rounded-r-full bg-blue-600" />
                  )}

                  <span
                    className={`relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-all duration-300 ${isActive
                        ? "bg-white text-blue-600 shadow-sm ring-1 ring-blue-100"
                        : "bg-slate-100/80 text-slate-500 group-hover:bg-white group-hover:text-blue-600 group-hover:shadow-sm"
                      }`}
                  >
                    {item.icon}
                  </span>

                  {!collapsed && (
                    <>
                      <span
                        className={`min-w-0 flex-1 truncate text-sm ${isActive ? "font-semibold" : "font-medium"
                          }`}
                      >
                        {item.name}
                      </span>

                      <ChevronRight
                        size={14}
                        className={`transition-all duration-300 ${isActive
                            ? "translate-x-0 text-blue-400 opacity-100"
                            : "-translate-x-1 text-slate-300 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                          }`}
                      />
                    </>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Product card */}
      <div
        className={`relative mt-auto border-t border-slate-200/60 ${collapsed ? "p-2" : "p-4"
          }`}
      >
        {collapsed ? (
          <div
            className="mx-auto flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 text-blue-600 ring-1 ring-blue-100"
            title="CareerPilot AI"
          >
            <Sparkles size={18} />
          </div>
        ) : (
          <div className="relative overflow-hidden rounded-[22px] border border-blue-100/80 bg-gradient-to-br from-white via-blue-50/60 to-indigo-50/70 p-4 shadow-[0_10px_30px_rgba(37,99,235,0.07)]">
            <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-blue-200/30 blur-2xl" />

            <div className="relative flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm ring-1 ring-blue-100">
                <Sparkles size={17} />
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-500">
                  AI Workspace
                </p>
                <p className="mt-0.5 text-sm font-bold text-slate-900">
                  CareerPilot AI
                </p>
              </div>
            </div>

            <p className="relative mt-3 text-xs leading-5 text-slate-500">
              Your intelligent career and job search assistant.
            </p>
          </div>
        )}
      </div>
    </aside>
  );
}

export default Sidebar;