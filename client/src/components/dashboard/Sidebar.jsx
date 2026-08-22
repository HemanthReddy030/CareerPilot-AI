import {
  FaHome,
  FaBriefcase,
  FaFileAlt,
  FaRobot,
  FaChartBar,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-white border-r border-gray-200 p-6">

      <nav className="flex flex-col gap-3">

        <a
          href="#"
          className="flex items-center gap-3 p-3 rounded-xl bg-indigo-100 text-indigo-600 font-semibold"
        >
          <FaHome />
          Dashboard
        </a>

        <a
          href="#"
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100 transition"
        >
          <FaBriefcase />
          Applications
        </a>

        <a
          href="#"
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100 transition"
        >
          <FaFileAlt />
          Resume AI
        </a>

        <a
          href="#"
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100 transition"
        >
          <FaRobot />
          Interview AI
        </a>

        <a
          href="#"
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100 transition"
        >
          <FaChartBar />
          Analytics
        </a>

        <a
          href="#"
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100 transition"
        >
          <FaCog />
          Settings
        </a>

      </nav>

      <div className="mt-auto pt-10">
        <button className="flex items-center gap-3 text-red-500 hover:text-red-600">
          <FaSignOutAlt />
          Logout
        </button>
      </div>

    </aside>
  );
}

export default Sidebar;