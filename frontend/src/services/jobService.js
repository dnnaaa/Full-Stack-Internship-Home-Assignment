// services/jobService.js
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/jobs';

export const JobService = {
  fetchJobs: () => axios.get(API_URL),
  fetchJobById: (id) => axios.get(`${API_URL}/${id}`),
  createJob: (job) => axios.post(API_URL, job),
  updateJob: (id, job) => axios.put(`${API_URL}/${id}`, job),
  deleteJob: (id) => axios.delete(`${API_URL}/${id}`),
};
