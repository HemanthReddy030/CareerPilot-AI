import { FaEdit, FaTrash } from "react-icons/fa";
import { FaBuilding } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

function JobRow({ job, onDelete, onEdit }) {
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

  return (
    <tr className="border-b hover:bg-gray-50 transition">

      <td className="p-4 font-semibold">

        <button
          onClick={() =>
            navigate(`/company/${encodeURIComponent(job.company)}`)
          }
          className="text-blue-600 hover:text-blue-800 hover:underline transition"
        >
          {job.company}
        </button>

      </td>

      <td className="p-4">
        {job.position}
      </td>

      <td className="p-4">
        {job.location}
      </td>

      <td className="p-4">

        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
            job.status
          )}`}
        >
          {job.status}
        </span>

      </td>

      <td className="p-4">

        <div className="flex justify-center gap-3">

          <button
            onClick={() =>
              navigate(`/company/${encodeURIComponent(job.company)}`)
            }
            className="bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-lg transition"
            title="Company Insights"
          >
            <FaBuilding />
          </button>

          <button
            onClick={() => onEdit(job)}
            className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg transition"
            title="Edit Job"
          >
            <FaEdit />
          </button>

          <button
            onClick={() => onDelete(job._id)}
            className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition"
            title="Delete Job"
          >
            <FaTrash />
          </button>

        </div>

      </td>

    </tr>
  );
}

export default JobRow;