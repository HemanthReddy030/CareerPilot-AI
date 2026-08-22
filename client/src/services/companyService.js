import axios from "axios";

import { API_URL } from "../config/api";

const API = `${API_URL}/company`;

export const getCompanyDetails = async (company) => {
    const token = localStorage.getItem("token");

    const { data } = await axios.get(
        `${API}/${encodeURIComponent(company)}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return data;
};