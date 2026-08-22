import axios from "axios";

import { API_URL } from "../config/api";

const API = `${API_URL}/calendar`;

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