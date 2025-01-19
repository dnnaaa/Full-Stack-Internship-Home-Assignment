import axios from 'axios';

const API_URL = "http://localhost:8080"; // remplacer par l'URL de API Backend

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': true,
  },
  withCredentials: true,
});

export default axiosInstance;
