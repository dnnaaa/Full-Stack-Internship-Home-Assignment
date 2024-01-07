package ma.dnaengineering.backend;

import com.opencsv.CSVReader;
import com.opencsv.exceptions.CsvValidationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static java.util.stream.Collectors.*;

@Service

public class CsvParserService {

    public Map<String, Object> processCsvData(String filePath) {
        Map<String, Object> result = new HashMap<>();
        try {
            List<Employee> employees = parseCsvFile(filePath);
            Map<String, Double> averageSalaries = calculateAverageSalaryByJobTitle(employees);

            result.put("employees", employees);
            result.put("averageSalaries", averageSalaries);

        } catch (IOException e) {
            e.printStackTrace();
        }

        return result;
    }

    public List<Employee> parseCsvFile(String filePath) throws IOException {
        List<Employee> employees = new ArrayList<>();

        try (CSVReader reader = new CSVReader(new FileReader(filePath))) {
            reader.readNext();

            String[] nextLine;
            while ((nextLine = reader.readNext()) != null) {
                Employee employee = Employee.builder()
                        .name(nextLine[0])
                        .jobTitle(nextLine[1])
                        .salary(Double.parseDouble(nextLine[2]))
                        .build();
                employees.add(employee);
            }
        } catch (CsvValidationException e) {
            throw new RuntimeException(e);
        }

        return employees;
    }

    public Map<String, Double> calculateAverageSalaryByJobTitle(List<Employee> employees) {
        Map<String, List<Employee>> employeesByJobTitle = employees
                .stream()
                .collect(groupingBy(Employee::getJobTitle));

        Map<String, Double> averageSalaries = new HashMap<>();

        for (Map.Entry<String, List<Employee>> entry : employeesByJobTitle.entrySet()) {
            List<Employee> employeesWithJobTitle = entry.getValue();
            double averageSalary = employeesWithJobTitle.stream()
                    .mapToDouble(Employee::getSalary)
                    .average()
                    .orElse(0.0);
            averageSalaries.put(entry.getKey(), averageSalary);
        }

        return averageSalaries;
    }
}