package ma.dnaengineering.backend.service;


import ma.dnaengineering.backend.dao.entities.Job;
import ma.dnaengineering.backend.dao.repositories.JobRepository;
import ma.dnaengineering.backend.dto.JobRequestDTO;
import ma.dnaengineering.backend.dto.JobResponseDTO;
import ma.dnaengineering.backend.dto.JobSummaryDTO;
import ma.dnaengineering.backend.exception.ResourceNotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class JobServiceImpl implements JobService {

    private final JobRepository jobRepository;
    private final ModelMapper modelMapper;


    @Override
    public JobResponseDTO createJob(JobRequestDTO requestDTO) {
        Job job = modelMapper.map(requestDTO, Job.class);
        Job savedJob = jobRepository.save(job);
        return modelMapper.map(savedJob, JobResponseDTO.class);
    }

    @Override
    @Transactional(readOnly = true)
    public List<JobSummaryDTO> getAllJobs() {
        return jobRepository.findAll().stream()
                .map(job -> modelMapper.map(job, JobSummaryDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public JobResponseDTO getJobById(Long id) {
        return jobRepository.findById(id)
                .map(job -> modelMapper.map(job, JobResponseDTO.class))
                .orElseThrow(() -> new ResourceNotFoundException("Job", id));
    }

    @Override
    public JobResponseDTO updateJob(Long id, JobRequestDTO requestDTO) {
        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Job", id));

        modelMapper.map(requestDTO, job);
        Job updatedJob = jobRepository.save(job);
        return modelMapper.map(updatedJob, JobResponseDTO.class);
    }

    @Override
    public void deleteJob(Long id) {
        if (!jobRepository.existsById(id)) {
            throw new ResourceNotFoundException("Job", id);
        }
        jobRepository.deleteById(id);
    }

}
