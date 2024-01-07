package ma.dnaengineering.backend.service;

import ma.dnaengineering.backend.model.Employee;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ParserService {

    private List<Employee> employeesData = new ArrayList<>();

    public void uploadAndProcessCsv(MultipartFile file) throws IOException {
        try (InputStream inputStream = file.getInputStream();
             BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream))) {

            employeesData = reader.lines()
                    .skip(1) // ToSkip header
                    .map(this::mapToEmployee)
                    .collect(Collectors.toList());
        }
    }

    public List<Employee> getAllEmployees() {
        return employeesData;
    }

    public Map<String, Double> calculateAverageSalaries() {
        return employeesData.stream()
                .collect(Collectors.groupingBy(Employee::getJobTitle,
                        Collectors.averagingDouble(Employee::getSalary)));
    }

    private Employee mapToEmployee(String line) {
        String[] fields = line.split(",");
        Employee employee = new Employee();
        employee.setId(Integer.parseInt(fields[0]));
        employee.setEmployeeName(fields[1]);
        employee.setJobTitle(fields[2]);
        employee.setSalary(Double.parseDouble(fields[3]));
        return employee;
    }
}
