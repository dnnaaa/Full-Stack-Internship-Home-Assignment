import axios from "axios";

const API_URL = 'http://localhost:8080/jobs'

export const getAllJobs = async() => {
    const response = await axios.get(API_URL);
    return response.data;
}
export const getJobById = async(id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
}
export const createJob = async(job) => {
    const response = await axios.post(API_URL, job);
    return response.data;
}
export const updateJob = async(id, job) => {
    const response = await axios.put(`${API_URL}/${id}`, job);
    return response.data;
}
export const deleteJob = async(id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data
}