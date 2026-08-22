import axios from "axios";

const API = "http://localhost:5000/api/jobs";

const getToken = () => {
  return localStorage.getItem("token");
};

// Get All Jobs
const getJobs = async () => {
  const response = await axios.get(API, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};

// Create Job
const createJob = async (jobData) => {
  const response = await axios.post(API, jobData, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};

// Update Job
const updateJob = async (id, jobData) => {
  const response = await axios.put(`${API}/${id}`, jobData, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};

// Delete Job
const deleteJob = async (id) => {
  const response = await axios.delete(`${API}/${id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};

export default {
  getJobs,
  createJob,
  updateJob,
  deleteJob,
};