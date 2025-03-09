import axios from "axios";

const ServiceAPI = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default ServiceAPI;
