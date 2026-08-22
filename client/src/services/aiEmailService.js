import axios from "axios";

import { API_URL } from "../config/api";

const API = `${API_URL}/ai-email`;

export const extractInterviewDetails = async (email) => {
  const { data } = await axios.post(`${API}/extract`, {
    email,
  });

  return data;
};