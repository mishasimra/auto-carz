import axios from "axios";

const rawApiUrl = import.meta.env.VITE_API_URL?.trim() || "http://localhost:5000/api";
const normalizedApiUrl = rawApiUrl.endsWith("/api")
  ? rawApiUrl
  : `${rawApiUrl.replace(/\/$/, "")}/api`;

const api = axios.create({
  baseURL: normalizedApiUrl
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("car-technic-token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API request failed:", {
      url: error.config?.url,
      method: error.config?.method,
      baseURL: error.config?.baseURL,
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });

    return Promise.reject(error);
  }
);

export default api;
