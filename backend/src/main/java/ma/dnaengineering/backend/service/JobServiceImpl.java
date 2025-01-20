package ma.dnaengineering.backend.service;


import ma.dnaengineering.backend.dao.entities.Job;
import ma.dnaengineering.backend.dao.repositories.JobRepository;
import ma.dnaengineering.backend.dto.JobDto;
import ma.dnaengineering.backend.mapper.JobMapper;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
@RequiredArgsConstructor
@Transactional
public class JobServiceImpl implements JobService {

    private final JobRepository jobRepository;
    private final JobMapper modelMapper;


    @Override
    public JobDto saveJob(JobDto jobDto) {
        Job job = modelMapper.fromJobDtoToJob(jobDto);
        job = jobRepository.save(job);
        jobDto = modelMapper.fromJobToJobDto(job);
        return jobDto;
    }

    @Override
    public List<JobDto> getAllJobs() {
        List<Job> jobs = jobRepository.findAll();
        List<JobDto> jobDtos = new ArrayList<>();
        for (Job job : jobs
             ) {
            jobDtos.add(modelMapper.fromJobToJobDto(job));
        }
        return jobDtos;
    }

    @Override
    public List<JobDto> filterJobs(String title, String location, BigDecimal minSalary, BigDecimal maxSalary) {
        List<Job> jobs = jobRepository.filterJobs(title, location, minSalary, maxSalary);
        List<JobDto> jobDtos = new ArrayList<>();
        for (Job job : jobs) {
            jobDtos.add(modelMapper.fromJobToJobDto(job));
        }
        return jobDtos;
    }


    @Override
    public boolean deleteJob(Long id) {
        try {
            jobRepository.deleteById(id);
            return true;
        } catch (Exception exception) {
            return false;
        }
    }

    @Override
    public JobDto getJobById(Long id) {
        Optional<Job> jobOptional = jobRepository.findById(id);
        Job job = jobOptional.get();
        JobDto jobDto= modelMapper.fromJobToJobDto(job);
        return jobDto ;
    }

    @Override
    public JobDto updateJob(Long id, JobDto jobDTO) {
        Optional<Job> jobOptional = jobRepository.findById(id);
        if(jobOptional.isPresent()){
            Job job= modelMapper.fromJobDtoToJob(jobDTO);
            job.setId(id);
            Job jobUpdated = jobRepository.save(job);
            JobDto jobDtoUpdate=modelMapper.fromJobToJobDto(jobUpdated);
            return jobDtoUpdate;
        }
        else {

        return null;}
    }
}
