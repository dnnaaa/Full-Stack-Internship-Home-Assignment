package ma.dnaengineering.backend.dtos;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import ma.dnaengineering.backend.entities.Job;

import java.time.LocalDateTime;

public record JobDTO(
    String title,
    String description,
    String location,
    Double salary
) {
    public Job convertToEntity() {
        return Job.builder()
                .description(description)
                .title(title)
                .salary(salary)
                .location(location)
                .postedAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();
    }
}
