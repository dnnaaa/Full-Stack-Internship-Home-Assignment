import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api/csv/parser/employees/',
});

export default api;