package ma.dnaengineering.backend.model;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor 
@AllArgsConstructor 
@Data
public class Job {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	@Column(nullable = false)
    private String title;
    @Column(columnDefinition = "TEXT", nullable = false)
    private String description;
    private String location;
    private float salary;
    @CreationTimestamp
    private LocalDateTime postedAt;
    @UpdateTimestamp
    private LocalDateTime updatedAt;
    


}
