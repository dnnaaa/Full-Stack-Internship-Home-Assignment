package ma.dnaengineering.backend.service;

import ma.dnaengineering.backend.persistence.Employee;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

@Service
public class CsvParserService {

    // Method to parse CSV data from a MultipartFile
    public List<Employee> parseCsv(MultipartFile file) throws IOException {

        // List to store parsed Employee objects
        List<Employee> employees = new ArrayList<>();

        // Using try-with-resources to automatically close the BufferedReader
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(file.getInputStream()))) {

            // The first line contains the headers (column names)
            String[] headers = reader.readLine().split(",");

            String line;

            // Read each line of the CSV file
            while ((line = reader.readLine()) != null) {
                // Split the line into values using a comma as the delimiter
                String[] values = line.split(",");

                // Convert the values into an Employee object and add it to the list
                Employee employee = getEmployee(headers, values);
                employees.add(employee);
            }
        }

        // Return the list of parsed Employee objects
        return employees;
    }

    // Helper method to create an Employee object from headers and values
    private static Employee getEmployee(String[] headers, String[] values) {
        // Create a new Employee object
        Employee employee = new Employee();

        // Iterate through headers and set corresponding values in the Employee object
        for (int i = 0; i < headers.length; i++) {
            switch (headers[i].toLowerCase()) {
                case "id":
                    // Parse the ID and set it in the Employee object
                    employee.setId(values[i] != null && !values[i].isEmpty() ? Long.parseLong(values[i]) : null);
                    break;
                case "employee_name":
                    // Set the employee name in the Employee object
                    employee.setEmployeeName(values[i]);
                    break;
                case "job_title":
                    // Set the job title in the Employee object
                    employee.setJobTitle(values[i]);
                    break;
                case "salary":
                    // Parse the salary and set it in the Employee object
                    employee.setSalary(Double.parseDouble(values[i]));
                    break;
            }
        }

        // Return the populated Employee object
        return employee;
    }
}
