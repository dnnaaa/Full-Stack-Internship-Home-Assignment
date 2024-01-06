import axios from 'axios';

// Create an instance of Axios with base URL configured
const api = axios.create({
    baseURL: 'http://localhost:8080/api/csv', // Set your base URL here
});

export default api;
