package ma.dnaengineering.backend.utils;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import ma.dnaengineering.backend.entities.Employee;

public class Parser {
	public static List<Employee> parseCsv(MultipartFile file) throws IOException {
        List<Employee> employees = new ArrayList<>();

        try (BufferedReader reader = new BufferedReader(new InputStreamReader(file.getInputStream()))) {
            String line;

            // Skip header row
            reader.readLine();

            while ((line = reader.readLine()) != null) {
                String[] parts = line.split(",");

                if (parts.length == 4) {
                    Employee employee = createEmployeeFromCsv(parts);
                    employees.add(employee);
                }
            }
        }

        return employees;
    }

    private static Employee createEmployeeFromCsv(String[] parts) {
        Employee employee = new Employee();
        employee.setId(Long.parseLong(parts[0]));
        employee.setName(parts[1]);
        employee.setJob(parts[2]);
        employee.setSalary(Double.parseDouble(parts[3]));
        return employee;
    }
}
