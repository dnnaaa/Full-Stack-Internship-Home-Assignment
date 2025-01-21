package ma.dnaengineering.backend.services;

import ma.dnaengineering.backend.dto.JobDTO;
import ma.dnaengineering.backend.entities.Job;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface JobService {

    JobDTO getJob(long id);
    Page<JobDTO> getAllJobs(Pageable pageable);

    JobDTO createJob(JobDTO jobDTO);

    JobDTO updateJob(JobDTO jobDTO);

    void deleteJob(long id);

    boolean checkIfJobExist(long id);
}
