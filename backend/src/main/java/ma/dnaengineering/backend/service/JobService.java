package ma.dnaengineering.backend.service;

import ma.dnaengineering.backend.dto.JobRequestDTO;
import ma.dnaengineering.backend.dto.JobResponseDTO;
import ma.dnaengineering.backend.dto.JobSummaryDTO;

import java.util.List;

public interface JobService {

    JobResponseDTO createJob(JobRequestDTO requestDTO);
    List<JobSummaryDTO> getAllJobs();
    JobResponseDTO getJobById(Long id);
    JobResponseDTO updateJob(Long id, JobRequestDTO requestDTO);
    void deleteJob(Long id);

}
