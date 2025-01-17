package ma.dnaengineering.backend.Service;

import ma.dnaengineering.backend.Entity.Job;
import ma.dnaengineering.backend.Repository.JobRepository;
import ma.dnaengineering.backend.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
    public class JobService {
        @Autowired
        private JobRepository jobRepository;

        public List<Job> getAllJobs() {
            return jobRepository.findAll();
        }

        public Job getJobById(Long id) {
            return jobRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Job not found"));
        }

        public Job createJob(Job job) {
            return jobRepository.save(job);
        }

        public Job updateJob(Long id, Job jobDetails) {
            Job job = getJobById(id);
            job.setTitle(jobDetails.getTitle());
            job.setDescription(jobDetails.getDescription());
            job.setLocation(jobDetails.getLocation());
            job.setSalary(jobDetails.getSalary());
            return jobRepository.save(job);
        }

        public void deleteJob(Long id) {
            jobRepository.deleteById(id);
        }
    }


