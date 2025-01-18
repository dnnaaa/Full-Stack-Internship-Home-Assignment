package ma.dnaengineering.backend.service;
import ma.dnaengineering.backend.entity.Job;
import ma.dnaengineering.backend.exception.ResourceNotFoundException;
import ma.dnaengineering.backend.repository.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class JobService implements IJobService{

    @Autowired
    JobRepository jobRepository;

    @Override
    public Job createJob(Job job) {
        return jobRepository.save(job);
    }

    @Override
    public List<Job> getAllJobs() {
        return jobRepository.findAll();
    }

    @Override
    public Job getJobById(Integer id) {
        return jobRepository.findById(id).
                orElseThrow(() -> new ResourceNotFoundException("Job not found with id " + id));
    }

    @Override
    public Job updateJob(Integer id, Job jobDetails) {
        Job job = getJobById(id);
        job.setTitle(jobDetails.getTitle());
        job.setDescription(jobDetails.getDescription());
        job.setLocation(jobDetails.getLocation());
        job.setSalary(jobDetails.getSalary());
        return jobRepository.save(job);
    }

    @Override
    public void deleteJob(Integer id) {
        jobRepository.deleteById(id);
    }
}
