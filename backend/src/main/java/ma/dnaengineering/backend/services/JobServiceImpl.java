package ma.dnaengineering.backend.services;

import lombok.RequiredArgsConstructor;
import ma.dnaengineering.backend.DAO.entities.Job;
import ma.dnaengineering.backend.DAO.repositories.JobRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
@RequiredArgsConstructor
public class JobServiceImpl implements JobService {

    private final JobRepository jobRepository;

    @Override
    public Job addJob(Job job) {
        return jobRepository.save(job);
    }

    @Override
    public List<Job> getAllJob() {
        return jobRepository.findAll();
    }

    @Override
    public Job getJob(Long id) {
        Job job = jobRepository.findById(id).orElse(null);
        return job;
    }

    @Override
    public Job updateJob(Long id, Job job) {
        Job modifiedJob = jobRepository.findById(id).orElse(null);

        if (modifiedJob!=null){
            if (job.getTitle()!=null){
                modifiedJob.setTitle(job.getTitle());
            }
            if (job.getDescription()!=null){
                modifiedJob.setDescription(job.getDescription());
            }
            if (job.getSalary()!=null){
                modifiedJob.setSalary(job.getSalary());
            }
        }

        return jobRepository.save(modifiedJob);
    }

    @Override
    public Boolean deleteJob(Long id) {
        if (jobRepository.findById(id).isPresent()){
            System.out.println(jobRepository.findById(id).get());
            jobRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
