import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/csvparser';

export const uploadFile = (formData) => {
  return axios.post(`${API_BASE_URL}/upload`, formData);
};

export const getEmployees = () => {
  return axios.get(`${API_BASE_URL}/employees`);
};

export const getJobSummary = () => {
  return axios.get(`${API_BASE_URL}/results`);
};
