import { Job, JobResponse } from "../types/job";

const API_URL = 'http://localhost:8081/api/jobs';

export const jobService = {
  async getAllJobs(): Promise<JobResponse[]> {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Failed to fetch jobs');
    return response.json();
  },

  async getJobById(id: number): Promise<JobResponse> {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) throw new Error('Failed to fetch job');
    return response.json();
  },

  async createJob(job: Job): Promise<JobResponse> {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(job),
    });
    if (!response.ok) throw new Error('Failed to create job');
    return response.json();
  },

  async updateJob(id: number, job: Job): Promise<JobResponse> {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(job),
    });
    if (!response.ok) throw new Error('Failed to update job');
    return response.json();
  },

  async deleteJob(id: number): Promise<void> {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete job');
  },
};
