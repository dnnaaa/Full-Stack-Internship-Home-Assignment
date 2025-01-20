package ma.dnaengineering.backend.Service;

import ma.dnaengineering.backend.Entity.Job;
import ma.dnaengineering.backend.Repository.JobRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class JobService {

    private final JobRepository jobRepository;

    //constructor
    public JobService(JobRepository jobRepository) {
        this.jobRepository = jobRepository;
    }

    //create a Job
    public Job createAJob(Job job){

        if (job.getPostedAt() == null) {
            job.setPostedAt(LocalDateTime.now());
        }
        return jobRepository.save(job);
    }

    //Display all jobs
    public List<Job> getAllJobs(){
        return  jobRepository.findAll();
    }

    //get job by id

    public Job getJobById(Long id){
        return jobRepository.findById(id)
                .orElseThrow(()->new IllegalArgumentException("job not found"+id));
    }

    //update a job
    public Job updateJob(Long id, Job updatedJob){
        Job existingJob=getJobById(id);
        existingJob.setTitle(updatedJob.getTitle());
        existingJob.setDescription(updatedJob.getDescription());
        existingJob.setLocation(updatedJob.getLocation());
        existingJob.setSalary(updatedJob.getSalary());
        existingJob.setUpdatedAt(LocalDateTime.now());
        return jobRepository.save(existingJob);
    }

    //delete a job
    public void deleteJob(Long id){
        jobRepository.deleteById(id);
    }
}
