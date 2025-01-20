import { api } from "../axios";
import { Job, JobMutation } from "../types";

export async function getAllJobs(): Promise<Job[]> {
    const response = await api.get("/jobs");
    return response.data;
}

export async function getJob(id:number):Promise<Job>{
    const response = await api.get(`/jobs/${id}`);
    return response.data;
}

export async function addJob(job:JobMutation):Promise<Job>{
    const response = await api.post(`/jobs`,job);
    return response.data;
}

export async function updateJob(job:JobMutation,id:number):Promise<Job>{
    const response = await api.put(`/jobs/${id}`,job);
    return response.data;
}

export async function deleteJob(id:number):Promise<boolean>{
    const response = await api.delete(`/jobs/${id}`);
    return response.data;
}