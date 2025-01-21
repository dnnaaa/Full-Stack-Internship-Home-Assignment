package ma.dnaengineering.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.antlr.v4.runtime.misc.NotNull;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.sql.Timestamp;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
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

    @CreationTimestamp
    private Timestamp postedAt;

    @UpdateTimestamp
    private Timestamp updatedAt;

    @PrePersist
    public void setDefaultValues() {
        if (this.salary == null) {
            this.salary = BigDecimal.valueOf(0.00);
        }
    }
}
