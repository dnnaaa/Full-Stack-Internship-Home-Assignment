package ma.dnaengineering.backend.services;


import jakarta.transaction.Transactional;
import ma.dnaengineering.backend.dto.JobRequest;
import ma.dnaengineering.backend.dto.JobResponse;
import ma.dnaengineering.backend.entities.Job;
import ma.dnaengineering.backend.exceptions.JobNotFoundException;
import ma.dnaengineering.backend.repository.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class JobService {

    @Autowired
    private JobRepository jobRepository;

    public List<JobResponse> findAll() {
        List<Job> jobs = jobRepository.findAll();
        List<JobResponse> jobResponses = new ArrayList<>();
        for (Job job : jobs) {
            JobResponse jobResponse = new JobResponse();
            jobResponse.setId(job.getId());
            jobResponse.setTitle(job.getTitle());
            jobResponse.setLocation(job.getLocation());
            jobResponse.setSalary(job.getSalary());
            jobResponses.add(jobResponse);
        }
        return jobResponses;
    }

    public Job findById(Long id) {
        return jobRepository.findById(id).orElseThrow(() -> new JobNotFoundException("Job not found"));
    }

    public void save(JobRequest jobRequest) {
        Job job = new Job();
        job.setTitle(jobRequest.getTitle());
        job.setDescription(jobRequest.getDescription());
        job.setLocation(jobRequest.getLocation());
        job.setSalary(jobRequest.getSalary());

        jobRepository.save(job);
    }

    public void update(Long id, JobRequest jobRequest) {
        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new JobNotFoundException("Job not found"));
        if(jobRequest.getTitle() != null){
            job.setTitle(jobRequest.getTitle());
        }
        if(jobRequest.getDescription() != null){
            job.setDescription(jobRequest.getDescription());
        }
        if(jobRequest.getLocation() != null){
            job.setLocation(jobRequest.getLocation());
        }
        if(jobRequest.getSalary() != null){
            job.setSalary(jobRequest.getSalary());
        }

        jobRepository.save(job);
    }

    public void delete(Long id) {
        jobRepository.deleteById(id);
    }
}
