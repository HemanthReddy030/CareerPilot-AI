import { useState } from "react";
import jobService from "../../services/jobService";

function JobForm({ onJobAdded }) {
  const [formData, setFormData] = useState({
    company: "",
    position: "",
    location: "",
    jobUrl: "",
    description: "",
    status: "Applied",
    priority: "Medium",
    notes: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.company || !formData.position) {
      alert("Company and Position are required.");
      return;
    }

    try {
      setLoading(true);

      const response = await jobService.createJob(formData);

      alert(response.message);

      setFormData({
        company: "",
        position: "",
        location: "",
        jobUrl: "",
        description: "",
        status: "Applied",
        priority: "Medium",
        notes: "",
      });

      if (onJobAdded) {
        onJobAdded();
      }
    } catch (error) {
      alert(
        error.response?.data?.message || "Failed to add job."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-xl rounded-xl p-8 mb-8">
      <h2 className="text-3xl font-bold mb-6">
        Add New Job
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          name="company"
          placeholder="Company Name"
          value={formData.company}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
        />

        <input
          type="text"
          name="position"
          placeholder="Job Position"
          value={formData.position}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
        />

        <input
          type="url"
          name="jobUrl"
          placeholder="Job URL"
          value={formData.jobUrl}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
        />

        <textarea
          name="description"
          placeholder="Job Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
          rows="4"
        />

        <div className="grid grid-cols-2 gap-4">

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          >
            <option>Applied</option>
            <option>Interview</option>
            <option>Offer</option>
            <option>Rejected</option>
            <option>Wishlist</option>
          </select>

          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>

        </div>

        <textarea
          name="notes"
          placeholder="Notes"
          value={formData.notes}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
          rows="3"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg w-full"
        >
          {loading ? "Adding Job..." : "Add Job"}
        </button>

      </form>
    </div>
  );
}

export default JobForm;