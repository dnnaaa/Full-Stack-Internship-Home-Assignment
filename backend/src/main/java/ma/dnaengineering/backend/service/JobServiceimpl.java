package ma.dnaengineering.backend.service;

import lombok.RequiredArgsConstructor;
import ma.dnaengineering.backend.dto.JobDto;
import ma.dnaengineering.backend.dto.JobResponse;
import ma.dnaengineering.backend.entity.Job;
import ma.dnaengineering.backend.repository.JobRepository;
import ma.dnaengineering.backend.service.JobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class JobServiceimpl implements JobService {

  private final JobRepository jobRepository;

  @Override
  public JobResponse createJob(JobDto jobDTO) {
    Job job = new Job();
    job.setTitle(jobDTO.getTitle());
    job.setDescription(jobDTO.getDescription());
    job.setLocation(jobDTO.getLocation());
    job.setSalary(jobDTO.getSalary());

    return mapToJobResponse(jobRepository.save(job));
  }

  @Override
  public List<JobResponse> getAllJobs() {
    return jobRepository.findAll().stream()
      .map(this::mapToJobResponse)
      .collect(Collectors.toList());
  }

  @Override
  public JobResponse getJobById(Long id) {
    Job job = jobRepository.findById(id)
      .orElseThrow();
    return mapToJobResponse(job);
  }

  @Override
  public JobResponse updateJob(Long id, JobDto jobDTO) {
    Job job = jobRepository.findById(id)
      .orElseThrow();

    job.setTitle(jobDTO.getTitle());
    job.setDescription(jobDTO.getDescription());
    job.setLocation(jobDTO.getLocation());
    job.setSalary(jobDTO.getSalary());

    return mapToJobResponse(jobRepository.save(job));
  }

  @Override
  public void deleteJob(Long id) {
    Job job = jobRepository.findById(id)
      .orElseThrow();
    jobRepository.delete(job);
  }

  private JobResponse mapToJobResponse(Job job) {
    JobResponse response = new JobResponse();
    response.setId(job.getId());
    response.setTitle(job.getTitle());
    response.setDescription(job.getDescription());
    response.setLocation(job.getLocation());
    response.setSalary(job.getSalary());
    response.setPostedAt(job.getPostedAt());
    response.setUpdatedAt(job.getUpdatedAt());
    return response;
  }
}
