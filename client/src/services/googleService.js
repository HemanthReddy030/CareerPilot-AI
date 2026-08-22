import axios from "axios";

import { API_URL } from "../config/api";

const API = `${API_URL}/google`;

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