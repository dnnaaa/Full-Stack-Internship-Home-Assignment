package ma.dnaengineering.backend.Service;

import ma.dnaengineering.backend.Entity.Job;
import ma.dnaengineering.backend.Repository.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class JobService {

    @Autowired
    private JobRepository jobRepository;


    public List<Job> getAllJobs(){
        return jobRepository.findAll();
    }

    public Optional<Job> getJobById(Long id){
        return jobRepository.findById(id);
    }

    public Job createJob(Job job){
        return jobRepository.save(job);
    }

    public Job updtaeJob(Long id, Job jobDetails){
        return jobRepository.findById(id).map(job -> {
            job.setTitle(jobDetails.getTitle());
            job.setDescription(jobDetails.getDescription());
            job.setLocation(jobDetails.getLocation());
            job.setSalary(jobDetails.getSalary());
            return jobRepository.save(job);
        }).orElseThrow(() -> new RuntimeException("Job not found with id " + id));
    }

    public void deleteJob(Long id){
        if (jobRepository.existsById(id)){
            jobRepository.deleteById(id);
        }
        else {
            throw new RuntimeException("Job not found with id " + id);
        }
    }
}
