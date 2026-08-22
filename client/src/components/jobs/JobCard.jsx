import { useNavigate } from "react-router-dom";
import { FaBuilding } from "react-icons/fa";

function JobCard({ job, onDelete }) {
  const navigate = useNavigate();

  const getStatusColor = (status) => {
    switch (status) {
      case "Applied":
        return "bg-blue-100 text-blue-700";

      case "Interview":
        return "bg-yellow-100 text-yellow-700";

      case "Offer":
        return "bg-green-100 text-green-700";

      case "Rejected":
        return "bg-red-100 text-red-700";

      case "Wishlist":
        return "bg-purple-100 text-purple-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "text-red-600";

      case "Medium":
        return "text-yellow-600";

      case "Low":
        return "text-green-600";

      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition duration-300">

      <div className="flex justify-between items-start">

        <div>

          <h2 className="text-2xl font-bold text-gray-900">
            {job.position}
          </h2>

          <button
            onClick={() =>
              navigate(`/company/${encodeURIComponent(job.company)}`)
            }
            className="text-lg text-blue-600 hover:text-blue-800 hover:underline font-semibold mt-1"
          >
            {job.company}
          </button>

          <p className="text-gray-500 mt-1">
            📍 {job.location || "Not Provided"}
          </p>

        </div>

        <span
          className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(
            job.status
          )}`}
        >
          {job.status}
        </span>

      </div>

      <div className="mt-5">

        <p>
          <strong>Priority:</strong>{" "}
          <span className={getPriorityColor(job.priority)}>
            {job.priority || "Medium"}
          </span>
        </p>

        <p className="mt-2">
          <strong>Description:</strong>
        </p>

        <p className="text-gray-600">
          {job.description || "No description available."}
        </p>

        <p className="mt-3 text-sm text-gray-500">
          Applied: {new Date(job.createdAt).toLocaleDateString()}
        </p>

      </div>

      <div className="flex flex-wrap gap-3 mt-6">

        {job.jobUrl && (
          <a
            href={job.jobUrl}
            target="_blank"
            rel="noreferrer"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
          >
            Open Job
          </a>
        )}

        <button
          onClick={() =>
            navigate(`/company/${encodeURIComponent(job.company)}`)
          }
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition"
        >
          <FaBuilding />
          Company Insights
        </button>

        <button
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
          onClick={() => onDelete(job._id)}
        >
          Delete
        </button>

      </div>

    </div>
  );
}

export default JobCard;