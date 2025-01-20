package ma.dnaengineering.backend.mapper;

import lombok.RequiredArgsConstructor;
import ma.dnaengineering.backend.dao.entities.Job;
import ma.dnaengineering.backend.dto.JobDto;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class JobMapper {

    private final ModelMapper modelMapper = new ModelMapper();

    public Job fromJobDtoToJob(JobDto JobDto){
        return modelMapper.map(JobDto, Job.class);
    }

    public JobDto fromJobToJobDto(Job Job){
        return modelMapper.map(Job, JobDto.class);
    }

}
