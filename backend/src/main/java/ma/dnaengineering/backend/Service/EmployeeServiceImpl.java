package ma.dnaengineering.backend.Service;


import ma.dnaengineering.backend.DTO.Employee;
import ma.dnaengineering.backend.DTO.JobSalary;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class EmployeeServiceImpl implements EmployeeService{

    public List<Employee> parseCsv(String filePath) throws IOException {
        List<Employee> employees = new ArrayList<>();

        try (BufferedReader br = new BufferedReader(new FileReader(filePath))) {
            String line;
            // Skip the header line
            br.readLine();

            while ((line = br.readLine()) != null) {
                String[] data = line.split(",");
                // Check if the array has exactly four elements
                if (data.length == 4) {
                    // Parse id, employee_name, job_title, and salary from the array
                    long id = Long.parseLong(data[0]);
                    String employeeName = data[1];
                    String jobTitle = data[2];
                    // Check if the salary field is a valid double
                    try {
                        double salary = Double.parseDouble(data[3]);
                        // Create a new Employee object and add it to the list
                        Employee employee = new Employee(id, employeeName, jobTitle, salary);
                        employees.add(employee);
                    } catch (NumberFormatException e) {
                        // Handle or log the error, depending on your requirements
                        System.err.println("Invalid salary value: " + data[3]);
                    }
                }
            }
        }

        return employees;
    }



    public List<JobSalary> calculateAverageSalaryByJobTitle(List<Employee> employees) {
        return employees.stream()
                .collect(Collectors.groupingBy(
                        Employee::getJobTitle,
                        Collectors.averagingDouble(Employee::getSalary)
                ))
                .entrySet()
                .stream()
                .map(entry -> {
                    JobSalary jobSalary = new JobSalary();
                    jobSalary.setJobTitle(entry.getKey());
                    jobSalary.setAvgSalary(entry.getValue());
                    return jobSalary;
                })
                .collect(Collectors.toList());
    }
}
