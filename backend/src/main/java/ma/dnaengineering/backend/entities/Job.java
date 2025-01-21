package ma.dnaengineering.backend.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(
        name = "jobs",
        indexes = {
                @Index(name = "idx_job_title", columnList = "title"),
                @Index(name = "idx_job_location", columnList = "location")
        }
)
public class Job {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "Title is mandatory")
    @Column(nullable = false, length = 100)
    private String title;

    @NotNull(message = "Description is mandatory")
    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    private String location;

    @Positive(message = "Salary must be greater than 0")
    @Column(precision = 10, scale = 2)
    private BigDecimal salary;

    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime postedAt;

    @UpdateTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime updatedAt;
}

