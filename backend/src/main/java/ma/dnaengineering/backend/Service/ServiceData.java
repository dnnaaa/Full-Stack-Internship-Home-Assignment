package ma.dnaengineering.backend.Service;

import ma.dnaengineering.backend.Model.Employee;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ServiceData {

    private List<Employee> employees = new ArrayList<>();

    public void processCsv(MultipartFile file) throws IOException {
        // Clear existing data
        employees.clear();

        try (BufferedReader reader = new BufferedReader(new InputStreamReader(file.getInputStream()))) {
            String line = reader.readLine();
            while ((line = reader.readLine()) != null) {
                // Split the CSV line into fields
                String[] fields = line.split(",");

                // Create an Employee object and add it to the list
                Employee employee = new Employee();
                employee.setId(Long.parseLong(fields[0]));
                employee.setName(fields[1]);
                employee.setJobTitle(fields[2]);

                employee.setSalary(Double.parseDouble(fields[3]));

                employees.add(employee);
            }
        }
    }

    public List<Employee> getAllEmployees() {
        return employees;
    }


    public List<String> getJobTitleSummary() {
        // Grouper les employés par titre d'emploi et calculer la moyenne du salaire
        Map<String, Double> averageSalariesByJobTitle = employees.stream()
                .collect(Collectors.groupingBy(Employee::getJobTitle,
                        Collectors.averagingDouble(Employee::getSalary)));

        // Créer une liste de chaînes avec les titres d'emploi et les salaires moyens
        return averageSalariesByJobTitle.entrySet().stream()
                .map(entry -> entry.getKey() + ": " + entry.getValue())
                .collect(Collectors.toList());
    }
}
