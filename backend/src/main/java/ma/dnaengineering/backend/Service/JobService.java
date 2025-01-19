package ma.dnaengineering.backend.Service;

import ma.dnaengineering.backend.Entity.Job;
import ma.dnaengineering.backend.Repository.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class JobService {
    private JobRepository jobRepository;

    public JobService(JobRepository jobRepository) {
        this.jobRepository = jobRepository;
    }

    public List<Job> getAllJobs() {
        return jobRepository.findAll();
    }

    public Optional<Job> getJobById(int id) {
        return jobRepository.findById(id);
    }

    public Job createJob(Job job) {
        return jobRepository.save(job);
    }

    public Job updateJob(int id, Job jobDetails) {
        if (jobRepository.existsById(id)) {
            jobDetails.setId(id);
            return jobRepository.save(jobDetails);
        }
        return null;
    }

    public void deleteJob(int id) {
        jobRepository.deleteById(id);
    }
}
