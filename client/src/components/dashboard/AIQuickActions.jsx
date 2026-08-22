import {
  FaFileAlt,
  FaRobot,
  FaClipboardCheck,
  FaUserTie,
  FaRoad,
  FaSearch,
} from "react-icons/fa";

function AIQuickActions() {
  const actions = [
    {
      title: "ATS Resume Score",
      description: "Analyze resume ATS compatibility",
      icon: <FaClipboardCheck />,
      color: "bg-indigo-600",
    },
    {
      title: "Resume Optimizer",
      description: "Improve resume using AI",
      icon: <FaFileAlt />,
      color: "bg-green-500",
    },
    {
      title: "Interview Questions",
      description: "Generate technical & HR questions",
      icon: <FaUserTie />,
      color: "bg-orange-500",
    },
    {
      title: "Career Roadmap",
      description: "AI learning roadmap",
      icon: <FaRoad />,
      color: "bg-pink-500",
    },
    {
      title: "Job Match Score",
      description: "Compare resume with JD",
      icon: <FaSearch />,
      color: "bg-cyan-500",
    },
    {
      title: "AI Assistant",
      description: "Ask anything about jobs",
      icon: <FaRobot />,
      color: "bg-red-500",
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mt-8">
      <h2 className="text-2xl font-bold mb-6">
        AI Quick Actions
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {actions.map((item, index) => (
          <div
            key={index}
            className="border rounded-xl p-5 hover:shadow-lg transition cursor-pointer"
          >
            <div
              className={`${item.color} w-14 h-14 rounded-xl flex items-center justify-center text-white text-2xl`}
            >
              {item.icon}
            </div>

            <h3 className="font-bold text-lg mt-4">
              {item.title}
            </h3>

            <p className="text-gray-500 mt-2">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AIQuickActions;