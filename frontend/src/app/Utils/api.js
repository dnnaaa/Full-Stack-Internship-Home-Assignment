import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8090/api/v1", 
});

export const fetchJobs = async () => (await API.get("/jobs")).data;
export const fetchJobById = async (id) => (await API.get(`/jobs/${id}`)).data;
export const addJob = async (jobData) => (await API.post("/jobs", jobData)).data;
export const updateJob = async (id, jobData) => (await API.put(`/jobs/${id}`, jobData)).data;
export const deleteJob = async (id) => (await API.delete(`/jobs/${id}`)).data;
