package com.example.dnaaa_project.repository;

import com.example.dnaaa_project.entities.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface EmployeeRepository extends JpaRepository<Employee,Long> {
    @Query("FROM Employee e WHERE UPPER(e.job_title) = UPPER(:job_title)")
    List<Employee> findAllByJobTitleIgnoreCase(@Param("job_title") String jobTitle);
}
