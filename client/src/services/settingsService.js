import axios from "axios";

import { API_URL } from "../config/api";

const API = `${API_URL}/settings`;

const getToken = () => localStorage.getItem("token");

export const getAnalyticsData = async () => {
  const response = await axios.get(`${API}/analytics`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return response.data;
};

export const getSettingsData = async () => {
  const response = await axios.get(`${API}/settings`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return response.data;
};

export const updateProfile = async (profileData) => {
  const response = await axios.put(`${API}/profile`, profileData, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return response.data;
};

export const changePassword = async (passwordData) => {
  const response = await axios.put(`${API}/password`, passwordData, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return response.data;
};

export const disconnectGoogle = async () => {
  const response = await axios.post(`${API}/google/disconnect`, {}, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return response.data;
};

export const deleteAccount = async () => {
  const response = await axios.delete(`${API}/account`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return response.data;
};
