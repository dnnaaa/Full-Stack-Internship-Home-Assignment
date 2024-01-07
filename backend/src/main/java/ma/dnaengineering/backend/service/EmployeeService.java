package ma.dnaengineering.backend.service;

import ma.dnaengineering.backend.entities.Employee;
import ma.dnaengineering.backend.entities.JobsSummary;
import org.springframework.data.domain.Page;

import java.util.List;

public interface EmployeeService {

    public List<Employee> findAll();
    public void add(Employee employee);
    public void deleteAll();
    public List<JobsSummary> calculateSummary();
}
