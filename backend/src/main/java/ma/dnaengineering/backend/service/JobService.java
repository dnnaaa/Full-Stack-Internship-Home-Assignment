package ma.dnaengineering.backend.service;

import ma.dnaengineering.backend.dto.JobDto;

import java.math.BigDecimal;
import java.util.List;

public interface JobService {

    public JobDto saveJob(JobDto jobDto);
    public List<JobDto> getAllJobs();
    public List<JobDto> filterJobs(String title, String location, BigDecimal minSalary, BigDecimal maxSalary);

    public boolean deleteJob(Long id);

    public JobDto getJobById(Long id);
    public JobDto updateJob(Long id, JobDto jobDTO);

}
