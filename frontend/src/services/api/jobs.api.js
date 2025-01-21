import axios from "@/services/http/axios.config"

export const getAllJobs = async () => {
  const response = await axios.get("/jobs")
  return response.data
}

export const getJobById = async (id) => {
  const response = await axios.get(`/jobs/${id}`)
  return response.data
}

export const createJob = async (jobData) => {
  const response = await axios.post("/jobs", jobData)
  return response.data
}

export const updateJob = async (id, jobData) => {
  const response = await axios.put(`/jobs/${id}`, jobData)
  return response.data
}

export const deleteJob = async (id) => {
  const response = await axios.delete(`/jobs/${id}`)
  return response.data
}

