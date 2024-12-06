import axios from "axios";

const axiosInstance = axios.create(
    {
        baseURL: 'http://localhost:5173/',
        timeout: 5000,
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        }
    })

export default axiosInstance