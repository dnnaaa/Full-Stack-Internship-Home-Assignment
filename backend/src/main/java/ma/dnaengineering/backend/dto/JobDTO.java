package ma.dnaengineering.backend.dto;

import jakarta.validation.constraints.NotEmpty;
import lombok.Builder;
import ma.dnaengineering.backend.entity.Job;

import java.math.BigDecimal;
import java.sql.Timestamp;

@Builder
public record JobDTO(Long id, @NotEmpty(message = "Title is required") String title, @NotEmpty(message = "Description is required") String description, String location, BigDecimal salary, Timestamp postedAt, Timestamp updatedAt) {
    public static Job toEntity(JobDTO jobDTO) {
        return Job.builder()
                .title(jobDTO.title)
                .description(jobDTO.description)
                .location(jobDTO.location)
                .salary(jobDTO.salary)
                .postedAt(jobDTO.postedAt)
                .updatedAt(jobDTO.updatedAt)
                .build();
    }

    public static JobDTO toDto(Job job) {
        return JobDTO.builder()
                .id(job.getId())
                .title(job.getTitle())
                .description(job.getDescription())
                .salary(job.getSalary())
                .location(job.getLocation())
                .postedAt(job.getPostedAt())
                .updatedAt(job.getUpdatedAt())
                .build();
    }
}