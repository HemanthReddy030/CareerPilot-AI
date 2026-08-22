import axios from "axios";

import { API_URL } from "../config/api";

const API = `${API_URL}/resume`;

const getToken = () => {
  return localStorage.getItem("token");
};

const uploadResume = async (file) => {
  const formData = new FormData();

  formData.append("resume", file);

  const response = await axios.post(
    `${API}/upload`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

const getResumes = async () => {
  const response = await axios.get(API, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};

const deleteResume = async (id) => {
  const response = await axios.delete(
    `${API}/${id}`,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

  return response.data;
};

export default {
  uploadResume,
  getResumes,
  deleteResume,
};