package ma.dnaengineering.backend.service;

import ma.dnaengineering.backend.models.Employee;
import ma.dnaengineering.backend.models.JobSummary;

import java.util.List;

public interface CsvService {
    public List<Employee> getEmployees();
    public List<JobSummary> getJobSummary();
}
