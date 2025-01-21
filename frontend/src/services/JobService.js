import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/api',
});

class JobService {
    async getAllJobs() {
        try {
            const response = await axiosInstance.get('/jobs');
            return response.data;
        } catch (error) {
            console.error('Error fetching jobs:', error);
            throw error;
        }
    }

    async createJob(job) {
        try {
            const response = await axiosInstance.post('/jobs', job);
            return response.data;
        } catch (error) {
            console.error('Error creating job:', error);
            throw error;
        }
    }

    async getJobById(jobId) {
        try {
            const response = await axiosInstance.get(`/jobs/${jobId}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching job with ID ${jobId}:`, error);
            throw error;
        }
    }

    async updateJob(jobId, job) {
        try {
            const response = await axiosInstance.put(`/jobs/${jobId}`, job);
            return response.data;
        } catch (error) {
            console.error(`Error updating job with ID ${jobId}:`, error);
            throw error;
        }
    }

    async deleteJob(jobId) {
        try {
            await axiosInstance.delete(`/jobs/${jobId}`);
        } catch (error) {
            console.error(`Error deleting job with ID ${jobId}:`, error);
            throw error;
        }
    }
}
// eslint-disable-next-line import/no-anonymous-default-export
export default new JobService();
