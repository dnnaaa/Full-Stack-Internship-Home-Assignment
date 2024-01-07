package ma.dnaengineering.backend.services;

import ma.dnaengineering.backend.dto.SalarySummaryDTO;
import ma.dnaengineering.backend.entities.Employee;
import ma.dnaengineering.backend.repository.EmployeeRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class EmployeeService {

    private final EmployeeRepository employeeRepository;

    public EmployeeService(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    public void parseCSVFile(MultipartFile file) {

        boolean isFirstLine = true;

        try (BufferedReader br = new BufferedReader(new InputStreamReader(file.getInputStream(), StandardCharsets.UTF_8))) {
            String line;
            while ((line = br.readLine()) != null) {
                if (isFirstLine) {
                    isFirstLine = false;
                    continue;
                }

                String[] data = line.split(",");
                Employee employee = new Employee(
                        Integer.parseInt(data[0].trim()),
                        data[1].trim(),
                        data[2].trim(),
                        Double.parseDouble(data[3].trim())
                );
                employeeRepository.save(employee);
            }
        } catch (Exception e) {
            throw new RuntimeException("fail to parse CSV file: " + e.getMessage());
        }
    }

    public Map<String, SalarySummaryDTO> calculateAverageSalary(List<Employee> employees) {
        return employees.stream()
                .collect(Collectors.groupingBy(
                        Employee::getJobTitle,
                        Collectors.averagingDouble(Employee::getSalary)
                ))
                .entrySet().stream()
                .collect(Collectors.toMap(
                        Map.Entry::getKey,
                        e -> new SalarySummaryDTO(e.getKey(), e.getValue())
                ));
    }

    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }


}
