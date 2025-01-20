import axios from 'axios';


const API_URL = 'http://localhost:8484/api/jobs';

export const getJobs = () => {
  return axios.get(`${API_URL}/All` );
};
// Fetch paginated and sorted jobs
export const getPaginatedJobs = async (page, size, sort) => {
  return axios.get(`${API_URL}`, {
    params: { page, size, sort },
  });
};

export const getJobById = (id) => {
  return axios.get(`${API_URL}/${id}`);
};

export const createJob = (job) => {
  return axios.post(API_URL, job);
};

export const updateJob = (id, job) => {
  return axios.put(`${API_URL}/${id}`, job);
};

export const deleteJob = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};
