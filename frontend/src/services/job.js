import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/job';

export const getJobs = () => axios.get(API_BASE_URL);
export const createJob = jobData => axios.post(API_BASE_URL, jobData);
export const deleteJob = (id) => axios.delete(`${API_BASE_URL}/${id}`);
export const getJobById = (id) => axios.get(`${API_BASE_URL}/${id}`);
export const updateJob = (id, jobData) => axios.put(`${API_BASE_URL}/${id}`, jobData);

