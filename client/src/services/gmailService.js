import axios from "axios";

const API = "http://localhost:5000/api/gmail";

export const getJobEmails = async () => {
  const token = localStorage.getItem("token");
  const { data } = await axios.get(`${API}/emails`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};