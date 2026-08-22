import { useEffect, useState } from "react";
import jobService from "../../services/jobService";
import JobCard from "./JobCard";

function JobList({ refresh }) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadJobs = async () => {
    try {
      setLoading(true);

      const response = await jobService.getJobs();

      setJobs(response.jobs);
    } catch (error) {
      console.error(error);
      alert("Failed to load jobs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadJobs();
  }, [refresh]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this job application?"
    );

    if (!confirmDelete) return;

    try {
      await jobService.deleteJob(id);

      setJobs((prevJobs) =>
        prevJobs.filter((job) => job._id !== id)
      );

      alert("Job deleted successfully.");
    } catch (error) {
      console.error(error);
      alert("Unable to delete job.");
    }
  };

  if (loading) {
    return (
      <div className="text-center py-10 text-xl font-semibold">
        Loading Jobs...
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <div className="bg-white shadow-lg rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold">
          No Job Applications Yet
        </h2>

        <p className="text-gray-500 mt-3">
          Add your first job application above.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 mt-10">
      {jobs.map((job) => (
        <JobCard
          key={job._id}
          job={job}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}

export default JobList;