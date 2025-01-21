package ma.dnaengineering.backend.service;

import ma.dnaengineering.backend.dto.JobDto;

import java.util.List;

public interface JobService {
    JobDto createJob(JobDto jobDto);

    JobDto getJobById(Long JobId);

    List<JobDto> getAllJobs();

    JobDto updateJob(Long jobId,JobDto updatedJob);

    void deleteJob(Long jobId);
}
