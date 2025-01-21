package ma.dnaengineering.backend.servicesImplementations;

import lombok.AllArgsConstructor;
import ma.dnaengineering.backend.dtos.JobDTO;
import ma.dnaengineering.backend.entities.Job;
import ma.dnaengineering.backend.errors.BadRequestException;
import ma.dnaengineering.backend.errors.NotFoundException;
import ma.dnaengineering.backend.repositories.JobRepository;
import ma.dnaengineering.backend.services.JobService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class JobServiceImpl implements JobService {
    private final JobRepository jobRepository;

    @Override
    public Job createJob(Job job) {
        if (job == null || job.getTitle() == null || job.getDescription() == null) {
            throw new BadRequestException("Invalid job data provided.");
        }
        return jobRepository.save(job);
    }

    @Override
    public Job getSingleJob(long id) {
        return jobRepository.findById(id).orElseThrow(
                () -> new NotFoundException("Job not found with ID: " + id)
        );
    }


    @Override
    public List<JobDTO> getAllJobs() {
        List<Job> jobs = jobRepository.findAll();
        return jobs.stream()
                .map(job -> new JobDTO(job.getId(), job.getTitle(), job.getLocation(), job.getSalary()))
                .collect(Collectors.toList());
    }

    @Override
    public Job updateJob(Job job) {
        if (job == null || job.getId() == null) {
            throw new BadRequestException("Invalid job ID for updating.");
        }
        Job existingJob = jobRepository.findById(job.getId()).orElseThrow(
                () -> new NotFoundException("Job not found with ID: " + job.getId())
        );
        return jobRepository.save(job);
    }

    @Override
    public void deleteJob(long id) {
        if (!jobRepository.existsById(id)) {
            throw new NotFoundException("Job not found with ID: " + id);
        }
        try {
            jobRepository.deleteById(id);
        } catch (Exception e) {
            throw new BadRequestException("Unable to delete job due to a server issue.");
        }
    }
}
