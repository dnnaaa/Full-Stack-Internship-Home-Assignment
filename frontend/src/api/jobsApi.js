import axios from "./axios";

const jobsApi = {
  getJobs: async () => axios.get("/jobs"),
  getJobById: async (id) => axios.get(`/jobs/${id}`),
  addJob: async (job) => axios.post("/jobs", job),
  updateJob: async (id, job) => axios.put(`/jobs/${id}`, job),
  deleteJob: async (id) => axios.delete(`/jobs/${id}`),
};

export default jobsApi;
