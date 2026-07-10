import axios from "axios";
import { ACCESS_TOKEN } from "@/constants/storage";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers:{
        "Content-Type": "application/json"
    }
})

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem(ACCESS_TOKEN);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

export default api;