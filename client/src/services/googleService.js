import axios from "axios";

const API = "http://localhost:5000/api/google";

export const connectGoogle = async () => {
  const token = localStorage.getItem("token");
  const { data } = await axios.get(`${API}/login`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const getGoogleAuthUrl = async () => {
  const { data } = await axios.get(`${API}/auth`);
  return data;
};