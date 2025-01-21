package ma.dnaengineering.backend.services;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import ma.dnaengineering.backend.dtos.JobDTO;
import ma.dnaengineering.backend.entities.Job;
import ma.dnaengineering.backend.repositories.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@Transactional
public class JobService {

    @Autowired
    private JobRepository jobRepository;

    public Job addJob(JobDTO job) {
        return jobRepository.save(job.convertToEntity());
    }

    public List<Job> getAllJobs() {
        return jobRepository.findAll();
    }

    public Job getJobById(Long id) throws EntityNotFoundException {
        return jobRepository.findById(id).orElseThrow(
                () ->new EntityNotFoundException("Job with id: " + id + " not found")
        );
    }

    public String deleteJobById(Long id) {
        jobRepository.deleteById(id);
        return "Job with id: " + id + " deleted";
    }

    public Job updateJob(JobDTO job, Long id) throws EntityNotFoundException {
        Job jobToUpdate = getJobById(id);

        jobToUpdate.setDescription(job.description());
        jobToUpdate.setLocation(job.location());
        jobToUpdate.setTitle(job.title());
        jobToUpdate.setSalary(job.salary());
        jobToUpdate.setUpdatedAt(LocalDateTime.now());

        return jobRepository.save(jobToUpdate);
    }


}
