import axios from "axios";

const api = axios.create({
    baseUrl: process.env.REACT_APP_URL_PROXY,
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;