import axios from "axios";

const API = "http://localhost:5000/api/calendar";

export const createCalendarEvent = async (eventData) => {
  const token = localStorage.getItem("token");

  const { data } = await axios.post(
    `${API}/create`,
    eventData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};