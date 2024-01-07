package ma.dnaengineering.backend;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import ma.dnaengineering.backend.EmployeeService.EmployeeData;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class EmployeeService {
    private List<employee> employees;
    Map<String, Double> averageSalaries;

    public EmployeeService() {
        employees = new ArrayList<>();
        averageSalaries = new HashMap<>();
    }

    public EmployeeData processCSVFile(MultipartFile file) throws IOException {
        InputStream inputStream = file.getInputStream();
        try (BufferedReader br = new BufferedReader(new InputStreamReader(inputStream))) {
            String line;
            while ((line = br.readLine()) != null) {
                String[] fields = line.split(",");
                String name = fields[0];
                String jobTitle = fields[2];
                String salary = fields[3];
                if (salary.matches("^-?\\d+(\\.\\d+)?$")){
                    double salaryDouble = Double.parseDouble(salary);
                    employee employee = new employee(name, jobTitle, salaryDouble);
                    employees.add(employee);
                }
            
            }
        }

        averageSalaries=calculateAverageSalaries();

        return new EmployeeData(employees, averageSalaries);
    }

    public Map<String, Double> calculateAverageSalaries() {
        Map<String, Double> totalSalaries = new HashMap<>();
        Map<String, Integer> jobTitleCounts = new HashMap<>();

        for (employee employee : employees) {
            String jobTitle = employee.getJobTitle();
            double salary = employee.getSalary();

            totalSalaries.put(jobTitle, totalSalaries.getOrDefault(jobTitle, 0.0) + salary);
            jobTitleCounts.put(jobTitle, jobTitleCounts.getOrDefault(jobTitle, 0) + 1);
        }

        for (String jobTitle : totalSalaries.keySet()) {
            double totalSalary = totalSalaries.get(jobTitle);
            int count = jobTitleCounts.get(jobTitle);
            double averageSalary = totalSalary / count;
            averageSalaries.put(jobTitle, averageSalary);
        }
        return totalSalaries;
    }

    public class EmployeeData {
        private List<employee> employees;
        private Map<String, Double> averageSalaries;

        public EmployeeData(List<employee> employees, Map<String, Double> averageSalaries) {
            this.employees = employees;
            this.averageSalaries = averageSalaries;
        }

        public List<employee> getEmployees() {
            return employees;
        }

        public Map<String, Double> getAverageSalaries() {
            
            return averageSalaries;
        }
    }
}