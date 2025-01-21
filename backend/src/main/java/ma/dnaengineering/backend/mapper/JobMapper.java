package ma.dnaengineering.backend.mapper;

import ma.dnaengineering.backend.dto.JobDto;
import ma.dnaengineering.backend.entity.Job;

public class JobMapper {
    public static JobDto mapToJobDto(Job job){
        return new JobDto(
                job.getId(),
                job.getTitle(),
                job.getDescription(),
                job.getLocation(),
                job.getSalary(),
                job.getPostedAt(),
                job.getUpdatedAt()
        );
    }
    public static Job mapToJob(JobDto jobDto){
        return new Job(
                jobDto.getId(),
                jobDto.getTitle(),
                jobDto.getDescription(),
                jobDto.getLocation(),
                jobDto.getSalary(),
                jobDto.getPostedAt(),
                jobDto.getUpdatedAt()
        );
    }
}
