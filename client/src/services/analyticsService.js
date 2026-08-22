import axios from "axios";

import { API_URL } from "../config/api";

const API = `${API_URL}/analytics`;

export const getAnalytics = async () => {
    const token = localStorage.getItem("token");

    const { data } = await axios.get(API, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return data;
};