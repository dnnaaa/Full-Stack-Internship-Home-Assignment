package ma.dnaengineering.backend.mapper;

import lombok.RequiredArgsConstructor;
import ma.dnaengineering.backend.dao.entities.Job;
import ma.dnaengineering.backend.dto.JobRequestDTO;
import ma.dnaengineering.backend.dto.JobResponseDTO;
import ma.dnaengineering.backend.dto.JobSummaryDTO;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class JobMapper {

    private final ModelMapper modelMapper;

    public Job toEntity(JobRequestDTO jobRequestDTO) {
        return modelMapper.map(jobRequestDTO, Job.class);
    }

    public JobResponseDTO toResponseDTO(Job job) {
        return modelMapper.map(job, JobResponseDTO.class);
    }

    public JobSummaryDTO toSummaryDTO(Job job) {
        return modelMapper.map(job, JobSummaryDTO.class);
    }

    public List<JobResponseDTO> toResponseDTOList(List<Job> jobs) {
        return jobs.stream()
                .map(this::toResponseDTO)
                .collect(Collectors.toList());
    }

    public List<JobSummaryDTO> toSummaryDTOList(List<Job> jobs) {
        return jobs.stream()
                .map(this::toSummaryDTO)
                .collect(Collectors.toList());
    }

}
