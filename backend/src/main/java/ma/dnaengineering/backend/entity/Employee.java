package ma.dnaengineering.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name="employee")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;

    @Column(name="employee_name")
    private String employeeName;

    @Column(name="job_title")
    private String jobTitle;

    @Column(name = "salary")
    private double salary;

}
