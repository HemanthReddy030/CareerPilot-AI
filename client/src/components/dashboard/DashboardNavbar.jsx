import { FaBell, FaUserCircle } from "react-icons/fa";

function DashboardNavbar() {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8">

      {/* Logo */}
      <h1 className="text-2xl font-bold text-indigo-600">
        CareerPilot AI
      </h1>

      {/* Right Side */}
      <div className="flex items-center gap-6">

        <button className="relative">
          <FaBell className="text-2xl text-gray-600 hover:text-indigo-600 transition" />

          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            3
          </span>
        </button>

        <div className="flex items-center gap-2">
          <FaUserCircle className="text-3xl text-indigo-600" />

          <div>
            <p className="font-semibold text-gray-800">
              Hemanth
            </p>

            <p className="text-sm text-gray-500">
              Student
            </p>
          </div>
        </div>

      </div>
    </header>
  );
}

export default DashboardNavbar;