package ma.dnaengineering.backend.Service;

import ma.dnaengineering.backend.DTO.Employee;
import ma.dnaengineering.backend.DTO.JobSalary;

import java.io.IOException;
import java.util.List;

public interface EmployeeService {
    List<Employee> parseCsv(String filePath) throws IOException;
    List<JobSalary> calculateAverageSalaryByJobTitle(List<Employee> employees);
}
