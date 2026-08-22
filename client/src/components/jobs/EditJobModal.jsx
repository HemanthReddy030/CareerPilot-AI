import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBuilding } from "react-icons/fa6";

function EditJobModal({ job, onClose, onUpdate }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    company: job.company,
    position: job.position,
    location: job.location,
    status: job.status,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    onUpdate(job._id, formData);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 p-4">

      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8">

        <h2 className="text-3xl font-bold mb-6">
          ✏️ Edit Job
        </h2>

        <div className="space-y-4">

          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Company"
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <input
            type="text"
            name="position"
            value={formData.position}
            onChange={handleChange}
            placeholder="Position"
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Location"
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option>Applied</option>
            <option>Interview</option>
            <option>Offer</option>
            <option>Rejected</option>
            <option>Wishlist</option>
          </select>

        </div>

        {/* Company Insights Button */}

        <button
          type="button"
          onClick={() =>
            navigate(`/company/${encodeURIComponent(formData.company)}`)
          }
          className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl flex justify-center items-center gap-2 transition"
        >
          <FaBuilding />
          View Company Insights
        </button>

        <div className="flex justify-end gap-4 mt-8">

          <button
            type="button"
            onClick={onClose}
            className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-3 rounded-lg transition"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition"
          >
            Update
          </button>

        </div>

      </div>

    </div>
  );
}

export default EditJobModal;