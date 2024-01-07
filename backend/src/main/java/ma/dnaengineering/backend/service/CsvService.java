package ma.dnaengineering.backend.service;

// CsvService.java
import ma.dnaengineering.backend.model.Employee;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

@Service
public class CsvService {
    public List<Employee> readAndProcessCsv(MultipartFile file) throws IOException {
        List<Employee> employees = new ArrayList<>();

        try (BufferedReader reader = new BufferedReader(new InputStreamReader(file.getInputStream()))) {
            String line;
            while ((line = reader.readLine()) != null) {
                String[] data = line.split(",");
                // Assuming the CSV columns are in order: name, jobTitle, salary
                Employee employee = new Employee();
                employee.setName(data[0]);
                employee.setJobTitle(data[1]);
                employee.setSalary(Double.parseDouble(data[2]));
                employees.add(employee);
            }
        }

        return employees;
    }
}
