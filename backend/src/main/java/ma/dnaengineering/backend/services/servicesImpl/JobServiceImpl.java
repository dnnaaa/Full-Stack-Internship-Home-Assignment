package ma.dnaengineering.backend.services.servicesImpl;

import lombok.AllArgsConstructor;
import ma.dnaengineering.backend.dto.JobDTO;
import ma.dnaengineering.backend.entities.Job;
import ma.dnaengineering.backend.repositories.JobRepository;
import ma.dnaengineering.backend.services.JobService;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class JobServiceImpl implements JobService {

    private final JobRepository jobRepository;
    private final ModelMapper modelMapper;

    @Override
    public JobDTO getJob(long id) {
        Optional<Job> job = jobRepository.findById(id);
        return job.map(value -> modelMapper.map(value, JobDTO.class)).orElse(null);
    }

    @Override
    public Page<JobDTO> getAllJobs(Pageable pageable) {
        Page<Job> jobs = jobRepository.findAll(pageable);
        return jobs.map(value -> modelMapper.map(value, JobDTO.class));
    }

    @Override
    public JobDTO createJob(JobDTO jobDTO) {
        Job job = jobRepository.save(modelMapper.map(jobDTO, Job.class));
        return modelMapper.map(job, JobDTO.class);
    }

    @Override
    public JobDTO updateJob(JobDTO jobDTO) {
        Job job = jobRepository.save(modelMapper.map(jobDTO, Job.class));
        return modelMapper.map(job, JobDTO.class);
    }

    @Override
    public void deleteJob(long id) {
        jobRepository.deleteById(id);
    }

    @Override
    public boolean checkIfJobExist(long id) {
        return jobRepository.existsById(id);
    }
}
