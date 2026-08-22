import axios from "axios";

const API = "http://localhost:5000/api/company";

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