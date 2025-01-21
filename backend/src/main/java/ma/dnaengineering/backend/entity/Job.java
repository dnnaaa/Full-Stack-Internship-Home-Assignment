package ma.dnaengineering.backend.entity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@EntityListeners(AuditingEntityListener.class)
@Table(name="jobs")
public class Job {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title",nullable=false)
//    @NotBlank(message = "Title is required.")
    private String title;

    @Column(name = "description",nullable=false, length = 500)
//    @NotBlank(message = "Description is required.")
    private String description;

    @Column(name = "location")
    private String location;

    @Column(name="salary")
    private BigDecimal  salary;

    @CreatedDate
    @Column(name = "postedAt",nullable = false, updatable = false)
    private Date postedAt;

    @LastModifiedDate
    @Column(name = "updatedAt")
    private Date updatedAt;



}
