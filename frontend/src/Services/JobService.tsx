import { AddJobDto } from "../Components/AddJobModal/AddJobModal";
import { UpdateJobDto } from "../Components/UpdateJobModal/UpdateJobModal";
import { Job } from "../helpers/declarations";
import axios from "axios";

const apiBase = "http://localhost:8080";
export const AllJobs = async (): Promise<Job[]> => {
  try {
    const response = await axios.get<Job[]>(`${apiBase}/api/jobs`);

    return response.data;
  } catch (error) {
    console.error("Error in GetAllJobs:", error);
    return [];
  }
};
export const CreateJob = async (addJobDto: AddJobDto): Promise<Job> => {
  const reponse = await axios.post<Job>(`${apiBase}/api/jobs`, addJobDto);

  return reponse.data;
};

export const GetJobById = async (id: number): Promise<Job> => {
  const reponse = await axios.get<Job>(`${apiBase}/api/jobs/${id}`);

  return reponse.data;
};

export const UpdateJob = async (
  updateJobDto: UpdateJobDto,
  id: number
): Promise<Job> => {
  const reponse = await axios.put<Job>(
    `${apiBase}/api/jobs/${id}`,
    updateJobDto
  );

  return reponse.data;
};

export const DeleteJob = async (id: number): Promise<Job> => {
  const reponse = await axios.delete<Job>(`${apiBase}/api/jobs/${id}`);

  return reponse.data;
};
