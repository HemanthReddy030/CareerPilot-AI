import { useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";

function DashboardLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="relative min-h-screen bg-white text-slate-900">
      {/* Premium ambient background */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-32 top-20 h-96 w-96 rounded-full bg-blue-100/40 blur-3xl" />
        <div className="absolute right-[-120px] top-[30%] h-[420px] w-[420px] rounded-full bg-indigo-100/30 blur-3xl" />
        <div className="absolute bottom-[-180px] left-[35%] h-[420px] w-[420px] rounded-full bg-sky-100/30 blur-3xl" />
      </div>

      <Sidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed((prev) => !prev)}
      />

      <div
        className={`min-h-screen transition-[margin] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${collapsed ? "md:ml-20" : "md:ml-72"
          }`}
      >
        <Navbar collapsed={collapsed} />

        <main className="relative min-h-[calc(100vh-96px)] px-4 pb-10 pt-6 sm:px-6 md:px-8 md:pt-8 xl:px-10 xl:pb-14">
          <div className="cp-page-enter mx-auto w-full max-w-[1600px]">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;