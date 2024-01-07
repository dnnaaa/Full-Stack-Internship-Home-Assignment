package ma.dnaengineering.backend.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import ma.dnaengineering.backend.model.Employee;

@Repository
public interface EmployeeDao extends JpaRepository<Employee,Long> {
    
} 

