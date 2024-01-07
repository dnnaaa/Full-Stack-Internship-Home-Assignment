package ma.dnaengineering.backend.Services;

import ma.dnaengineering.backend.Entities.Employee;
import ma.dnaengineering.backend.Repositories.CSVRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class CSVService {
    @Autowired
    private CSVRepository csvRepository;
    public List<Employee> parseCsv(MultipartFile file) throws IOException {
        List<Employee> employees = new ArrayList<>();

        try (BufferedReader br = new BufferedReader(new InputStreamReader(file.getInputStream()))) {
            String line;
            while ((line = br.readLine()) != null) {
                try {
                    String[] parts = line.split(",");
                    Employee employee = new Employee();
                    employee.setId(Long.parseLong(parts[0].trim()));
                    employee.setName(parts[1].trim());
                    employee.setJobTitle(parts[2].trim());
                    employee.setSalary(Double.parseDouble(parts[3].trim()));
                    employees.add(employee);
                } catch (Exception e) {

                }
            }
        }

        return employees;
    }

    public Map<String, Double> calculateAverageSalaryByJobTitle(List<Employee> employees) {
        return employees.stream()
                .collect(Collectors.groupingBy(Employee::getJobTitle, Collectors.averagingDouble(Employee::getSalary)));
    }
    @Transactional
    public List<Employee> save(List<Employee> employees) {
        return csvRepository.saveAll(employees);
    }

}
