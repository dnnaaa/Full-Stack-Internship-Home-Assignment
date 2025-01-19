package ma.dnaengineering.backend.dtos;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.Instant;

@Data
public class JobDTO {
    @NotBlank(message = "Title is mandatory")
    private String title;
    @NotBlank(message = "Description is mandatory")
    private String description;
    private String location;
    private Double salary;
    @CreationTimestamp
    private Instant postedAt;
    @UpdateTimestamp
    private Instant updatedAt;
}
