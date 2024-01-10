package ma.dnaengineering.backend.service;

import ma.dnaengineering.backend.model.Employee;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.text.DecimalFormat;
import java.util.*;

@Service
public class CsvService {

    public Map<String, Object> parseCSV(MultipartFile file) throws IOException {
        Map<String, Object> result = new HashMap<>();
        List<Employee> employees = parseEmployees(file);
        result.put("employees", employees);
        result.put("averageSalaries", calculateAverageSalaries(employees));
        return result;
    }

    private List<Employee> parseEmployees(MultipartFile file) throws IOException {
        List<Employee> employees = new ArrayList<>();

        try (BufferedReader br = new BufferedReader(new InputStreamReader(file.getInputStream()))) {
            skipHeader(br); // Skip the header

            String line;
            while ((line = br.readLine()) != null) {
                String[] fields = line.split(",");
                if (fields.length == 4) {
                    Employee employee = createEmployee(fields);
                    employees.add(employee);
                }
            }
        }

        return employees;
    }

    private void skipHeader(BufferedReader br) throws IOException {
        br.readLine(); // Skip the header
    }

    private Employee createEmployee(String[] fields) {
        return Employee.builder()
                .id(Long.parseLong(fields[0]))
                .name(fields[1])
                .job(fields[2])
                .salary(Double.parseDouble(fields[3]))
                .build();
    }

    Map<String, String> calculateAverageSalaries(List<Employee> employees) {
        Map<String, List<Employee>> employeesByJobTitle = new HashMap<>();
        for (Employee employee : employees) {
            employeesByJobTitle.computeIfAbsent(employee.getJob(), k -> new ArrayList<>()).add(employee);
        }

        Map<String, String> averageSalaries = new HashMap<>();
        DecimalFormat decimalFormat = new DecimalFormat("#.##");

        for (Map.Entry<String, List<Employee>> entry : employeesByJobTitle.entrySet()) {
            String jobTitle = entry.getKey();
            List<Employee> jobTitleEmployees = entry.getValue();

            double averageSalary = jobTitleEmployees.stream()
                    .mapToDouble(Employee::getSalary)
                    .average()
                    .orElse(0.0);

            String formattedAverageSalary = decimalFormat.format(averageSalary);
            averageSalaries.put(jobTitle, formattedAverageSalary);
        }

        return averageSalaries;
    }
}
