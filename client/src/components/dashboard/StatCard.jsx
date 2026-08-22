import {
  FaBriefcase,
  FaUserTie,
  FaCheckCircle,
  FaTimesCircle,
  FaHeart,
  FaChartLine,
} from "react-icons/fa";

function StatsCards() {
  const stats = [
    {
      title: "Applications",
      value: 25,
      icon: <FaBriefcase />,
      color: "bg-blue-500",
    },
    {
      title: "Interviews",
      value: 8,
      icon: <FaUserTie />,
      color: "bg-yellow-500",
    },
    {
      title: "Offers",
      value: 2,
      icon: <FaCheckCircle />,
      color: "bg-green-500",
    },
    {
      title: "Rejected",
      value: 5,
      icon: <FaTimesCircle />,
      color: "bg-red-500",
    },
    {
      title: "Wishlist",
      value: 10,
      icon: <FaHeart />,
      color: "bg-purple-500",
    },
    {
      title: "Success Rate",
      value: "25%",
      icon: <FaChartLine />,
      color: "bg-indigo-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {stats.map((item, index) => (
        <div
          key={index}
          className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition duration-300"
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500">{item.title}</p>
              <h2 className="text-4xl font-bold mt-2">{item.value}</h2>
            </div>

            <div
              className={`${item.color} w-16 h-16 rounded-full flex items-center justify-center text-white text-3xl`}
            >
              {item.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default StatsCards;