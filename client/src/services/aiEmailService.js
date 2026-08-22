import axios from "axios";

const API = "http://localhost:5000/api/ai-email";

export const extractInterviewDetails = async (email) => {
  const { data } = await axios.post(`${API}/extract`, {
    email,
  });

  return data;
};