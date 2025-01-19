import axios from 'axios';

const API_URL = 'http://localhost:8080/api/jobs'; // Replace with your backend API URL

// Define the createJob function
export const createJob = async (jobData) => {
  try {
    const response = await axios.post(API_URL, jobData);
    return response.data;
  } catch (error) {
    console.error('Error creating job:', error);
    throw error;
  }
};

// Define the deleteJob function
export const deleteJob = async (jobId) => {
  try {
    const response = await axios.delete(`${API_URL}/${jobId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting job:', error);
    throw error;
  }
};

// Other exported functions
export const getAllJobs = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getJobById = async (jobId) => {
  const response = await axios.get(`${API_URL}/${jobId}`);
  return response.data;
};

export const updateJob = async (jobId, jobData) => {
  const response = await axios.put(`${API_URL}/${jobId}`, jobData);
  return response.data;
};
