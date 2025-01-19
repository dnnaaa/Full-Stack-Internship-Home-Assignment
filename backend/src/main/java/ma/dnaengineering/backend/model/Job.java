package ma.dnaengineering.backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.math.BigDecimal;
import java.sql.Timestamp;

@Data
@Entity
@Table(name = "JOBS")
public class Job {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "Title is required")
    @Column(nullable = false)
    private String title;

    @NotNull(message = "Description is required")
    @Column(nullable = false)
    private String description;

    private String location;

    private BigDecimal salary;

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private Timestamp postedAt;

    @UpdateTimestamp
    @Column(nullable = false)
    private Timestamp updatedAt;
}
