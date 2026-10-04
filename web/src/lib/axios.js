import axios from "axios"
import { useNavigate } from "react-router-dom";

const BASE_URI = import.meta.env.MODE === "development" ? "http://localhost:3000/api" : "/api"

export const axiosInstance = axios.create({
    baseURL: BASE_URI,
})

//attach token
axiosInstance.interceptors.request.use((config) => {
    const token = sessionStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
})

//handle expired/invalid token
axiosInstance.interceptors.response.use(
    (res) => res,
    async (err) => {
        const status = err.response?.status
        const code = err.response?.data?.code

        if (status === 401 &&
            (code === "SESSION_EXPIRED" || code === "INVALID_TOKEN")
        ) {
            sessionStorage.removeItem("token")
            const qrEntryPath = sessionStorage.getItem('qrEntryPath')
            if (qrEntryPath) {
                window.location.href = qrEntryPath
            }
        }
        return Promise.reject(err);
    }
)