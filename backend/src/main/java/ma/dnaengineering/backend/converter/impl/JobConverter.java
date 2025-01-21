package ma.dnaengineering.backend.converter.impl;

import ma.dnaengineering.backend.converter.Converter;
import ma.dnaengineering.backend.dto.JobData;
import ma.dnaengineering.backend.model.Job;
import org.springframework.stereotype.Component;

@Component
public class JobConverter implements Converter<Job, JobData> {
    @Override
    public JobData convert(Job job) {
        return JobData.builder()
                .title(job.getTitle())
                .description(job.getDescription())
                .id(job.getId())
                .location(job.getLocation())
                .postedAt(job.getPostedAt())
                .salary(job.getSalary())
                .updatedAt(job.getUpdatedAt())
                .build();
    }

    @Override
    public Job convertReverse(JobData data) {
        return Job.builder()
                .title(data.getTitle())
                .description(data.getDescription())
                .id(data.getId())
                .location(data.getLocation())
                .salary(data.getSalary())
                .build();
    }
}
