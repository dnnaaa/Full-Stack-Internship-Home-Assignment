package ma.dnaengineering.backend.Entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.sql.Timestamp;

@Data
@Entity
@Table(name = "jobs")
public class Job {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String description;

    private String location;

    private BigDecimal salary;

    @Column(nullable = false, updatable = false)
    @CreationTimestamp
    private Timestamp postedAt;

    @Column(nullable = false)
    @UpdateTimestamp
    private Timestamp updatedAt;

}
