import axios from 'axios';

const api = axios.create({
  baseURL: "http://localhost:8080/jobs",
});

export const getJobs = () => api.get("");
export const createJob = async (job) => {
  try {
    
    const response = await api.post("", job);
    console.log('Job created:', response.data);
    return response.data; 
  } catch (error) {
    console.error('Error creating job:', error);
    throw error; 
  }
};


export const updateJob = async (id, job) => {
  try {
    const response = await api.put(`/${id}`, job);
    return response.data;  
  } catch (error) {
    console.error('Error updating job:', error);
    throw error;
  }
};

export const deleteJob = async (id) => {
  try {
    await api.delete(`/${id}`);
    return { success: true };  
  } catch (error) {
    console.error('Error deleting job:', error);
    return { success: false, error: error.response.data };
  }
};