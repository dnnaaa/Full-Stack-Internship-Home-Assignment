import axios from 'axios';

const JOB_API_BASE_URL = "http://localhost:8080/api/jobs";

class JobService {

    getJobs(){
        return axios.get(JOB_API_BASE_URL)
            .catch(error => {
                console.error("Error fetching jobs:", error);
                throw error;
            });
    }
    
    createJob(job){
        return axios.post(JOB_API_BASE_URL, job)
            .catch(error => {
                console.error("Error creating job:", error);
                throw error;
            });
    }
    
    getJobById(jobId){
        return axios.get(`${JOB_API_BASE_URL}/${jobId}`)
            .catch(error => {
                console.error(`Error fetching job with ID ${jobId}:`, error);
                throw error;
            });
    }
    
    updateJob(job, jobId){
        return axios.put(`${JOB_API_BASE_URL}/${jobId}`, job)
            .catch(error => {
                console.error(`Error updating job with ID ${jobId}:`, error);
                throw error;
            });
    }
    
    deleteJob(jobId){
        return axios.delete(`${JOB_API_BASE_URL}/${jobId}`)
            .catch(error => {
                console.error(`Error deleting job with ID ${jobId}:`, error);
                throw error;
            });
    }
    
}

export default new JobService();
