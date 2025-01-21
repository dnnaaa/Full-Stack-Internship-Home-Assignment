package ma.dnaengineering.backend.service;

import ma.dnaengineering.backend.dto.JobDto;
import ma.dnaengineering.backend.dto.JobDto;
import ma.dnaengineering.backend.dto.JobResponse;
import java.util.List;

public interface JobService {
  JobResponse createJob(JobDto jobDTO);
  List<JobResponse> getAllJobs();
  JobResponse getJobById(Long id);
  JobResponse updateJob(Long id, JobDto jobDTO);
  void deleteJob(Long id);
}
