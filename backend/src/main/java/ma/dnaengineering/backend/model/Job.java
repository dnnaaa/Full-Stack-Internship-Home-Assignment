package ma.dnaengineering.backend.model;


import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Job {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private String title;

    @NotNull
    @Column(columnDefinition = "TEXT")
    private String description;

    private String location;

    private BigDecimal salary;

    @Column(updatable = false)
    private LocalDateTime postedAt;

    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        this.postedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}
