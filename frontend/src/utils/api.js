import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

export const fetchJobs = async () => {
  const response = await axios.get(`${API_BASE_URL}/jobs`);
  return response.data;
};

export const fetchJobById = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/jobs/${id}`);
  return response.data;
};

export const createJob = async (job) => {
  const response = await axios.post(`${API_BASE_URL}/jobs`, job);
  return response.data;
};

export const updateJob = async (id, job) => {
  const response = await axios.put(`${API_BASE_URL}/jobs/${id}`, job);
  return response.data;
};

export const deleteJob = async (id) => {
  const response = await axios.delete(`${API_BASE_URL}/jobs/${id}`);
  return response.data;
};