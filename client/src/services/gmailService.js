import axios from "axios";

import { API_URL } from "../config/api";

const API = `${API_URL}/gmail`;

export const getJobEmails = async () => {
  const token = localStorage.getItem("token");
  const { data } = await axios.get(`${API}/emails`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};