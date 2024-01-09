package ma.dnaengineering.backend.service;

import ma.dnaengineering.backend.helper.CSVHelper;
import ma.dnaengineering.backend.model.Employee;
import ma.dnaengineering.backend.repository.EmployeeRepository;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class CSVService {

    @Autowired
    private EmployeeRepository repository;

    public void save(MultipartFile file) {
        try {
            List<Employee> employees = CSVHelper.csvToEmployees(file.getInputStream());
            repository.saveAll(employees);
        } catch (IOException e) {
            throw new RuntimeException("Fail to store CSV data: " + e.getMessage());
        }
    }

    public ByteArrayInputStream load() {
        List<Employee> employees = repository.findAll();

        ByteArrayInputStream in = CSVHelper.employeesToCSV(employees);
        return in;
    }

    public List<Employee> getAllEmployees() {
        return repository.findAll();
    }

    public Map<String, Double> calculateAverageSalaryByJob() {
        List<Employee> employees = repository.findAll();
        Map<String, Double> averageSalaries = new HashMap<>();
        Map<String, Integer> jobCount = new HashMap<>();

        for (Employee employee : employees) {
            String jobTitle = employee.getJobTitle();
            double salary = employee.getSalary();

            averageSalaries.put(jobTitle, averageSalaries.getOrDefault(jobTitle, 0.0) + salary);
            jobCount.put(jobTitle, jobCount.getOrDefault(jobTitle, 0) + 1);
        }

        for (String jobTitle : averageSalaries.keySet()) {
            double averageSalary = averageSalaries.get(jobTitle) / jobCount.get(jobTitle);
            averageSalaries.put(jobTitle, averageSalary);
        }

        return averageSalaries;
    }
}
