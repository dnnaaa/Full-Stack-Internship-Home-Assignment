package ma.dnaengineering.backend.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import ma.dnaengineering.backend.dto.JobsSummary;
import ma.dnaengineering.backend.entities.Employee;
import ma.dnaengineering.backend.repositories.EmployeeRepository;
import ma.dnaengineering.backend.utils.Parser;

@Service
public class EmployeeService {
	
	@Autowired
	private EmployeeRepository employeeRepository;
	
	public List<Employee> parseFile(MultipartFile file) {
        try {
            List<Employee> employees = Parser.parseCsv(file);
            employeeRepository.saveAll(employees);
            
            return employees;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
	
	public List<JobsSummary> getAverageSalaryByJob() {
        List<Object[]> results = employeeRepository.getAverageSalaryByJob();

        return results.stream()
                .map(result -> new JobsSummary((String) result[0], (Double) result[1]))
                .collect(Collectors.toList());
    }
}
