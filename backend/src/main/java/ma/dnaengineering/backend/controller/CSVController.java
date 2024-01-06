package ma.dnaengineering.backend.controller;

import ma.dnaengineering.backend.model.Employee;
import ma.dnaengineering.backend.service.CSVFileParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/csv")
public class CSVController {

    @Autowired
    private CSVFileParser fileParser;

    private List<Employee> employees = new ArrayList<>();
    private Map<String, Double> jobSummary = new HashMap<>();

    @PostMapping("/upload")
    public List<Employee> uploadCSV(@RequestParam("file") MultipartFile file) {
        try {
            String csvData = new String(file.getBytes());
            List<String[]> parsedData = fileParser.parseCSV(csvData);
            getEmployeesFromParsedData(parsedData);
        } catch (Exception e) {
            // Handle exception or return an empty list in case of an error
            e.printStackTrace();
        }

        System.out.println(employees);// Log the exception for debugging
        return employees; // Return an empty list or handle the error accordingly
    }

    @PostMapping("/process")
    public Map<String, Object> processCSV(@RequestBody List<Employee> uploadedEmployees) {
        Map<String, Object> processingResults = new HashMap<>();
        try {
            employees = uploadedEmployees; // Set the uploaded employees
            jobSummary = getJobSummaryFromEmployees(employees);

            processingResults.put("employees", employees);
            processingResults.put("jobSummary", jobSummary);

            return processingResults;
        } catch (Exception e) {
            // Handle exception or return an empty map in case of an error
            e.printStackTrace(); // Log the exception for debugging
            return new HashMap<>(); // Return an empty map or handle the error accordingly
        }
    }

    private void getEmployeesFromParsedData(List<String[]> parsedData) {
        employees = new ArrayList<>();

        // Skip the first row (header) and start from index 1
        for (int i = 1; i < parsedData.size(); i++) {
            String[] rowData = parsedData.get(i);

            // Check if rowData contains only one element that is an empty string
            if (rowData.length == 1 && rowData[0].isEmpty()) {
                continue; // Skip processing this row
            }

            Employee employee = new Employee();
            try {
                employee.setId(Long.parseLong(rowData[0])); // Assuming ID is in index 0
                employee.setEmployeeName(rowData[1]);
                employee.setJobTitle(rowData[2]);
                employee.setSalary(Double.parseDouble(rowData[3])); // Assuming Salary is in index 3
                employees.add(employee);
            } catch (NumberFormatException | ArrayIndexOutOfBoundsException e) {
                // Handle exceptions or log them accordingly for debugging
                // This catches NumberFormatException or ArrayIndexOutOfBoundsException
                e.printStackTrace();
            }
        }
    }


    private Map<String, Double> getJobSummaryFromEmployees(List<Employee> employees) {
        // Logic to calculate average salary for each job title
        Map<String, Double> jobSummary = new HashMap<>();
        Map<String, List<Double>> jobSalaries = new HashMap<>();
        for (Employee employee : employees) {
            String jobTitle = employee.getJobTitle();
            if (!jobSalaries.containsKey(jobTitle)) {
                jobSalaries.put(jobTitle, new ArrayList<>());
            }
            jobSalaries.get(jobTitle).add(employee.getSalary());
        }
        for (String jobTitle : jobSalaries.keySet()) {
            List<Double> salaries = jobSalaries.get(jobTitle);
            double averageSalary = salaries.stream().mapToDouble(Double::doubleValue).average().orElse(0.0);
            jobSummary.put(jobTitle, averageSalary);
        }
        return jobSummary;
    }
}
