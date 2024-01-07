package com.example.dnaaa_project.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor @NoArgsConstructor @Builder @Data
public class Employee {
    @Id
    private Long id;
    private String employee_name;
    private String job_title;
    private Double salary;
}
