import axios from "axios";

export function getToken() {
  return localStorage.getItem("token");
}

const baseURL = "http://localhost:3000/";

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
  headers: { Authorization: `Bearer ${getToken()}` },
});

export default axiosInstance;
