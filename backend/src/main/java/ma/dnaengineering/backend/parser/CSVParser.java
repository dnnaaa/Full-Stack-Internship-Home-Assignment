package ma.dnaengineering.backend.parser;

import ma.dnaengineering.backend.entities.Employee;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class CSVParser {
    public List<Employee> parse(MultipartFile file) {
        List<String[]> csv = readCsvData(file);

        return csv.stream()
                .skip(1)
                .map(data -> Employee.builder()
                        .id(Long.parseLong(data[0]))
                        .name(data[1])
                        .jobTitle(data[2])
                        .salary(Double.parseDouble(data[3]))
                        .build())
                .collect(Collectors.toList());
    }

    public List<String[]> readCsvData(MultipartFile file) {
        List<String[]> csv = new ArrayList<>();
        try (BufferedReader br = new BufferedReader(new InputStreamReader(file.getInputStream()))) {
            String line;
            while ((line = br.readLine()) != null) {
                String[] data = line.split(",");
                csv.add(data);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return csv;
    }

    public Map<String, Double> calculateAverageSalary(List<Employee> employees) {
        Map<String, Double> averageSalaries = new HashMap<>();
        Map<String, Integer> jobTitleCounts = new HashMap<>();

        for (Employee employee : employees) {
            String jobTitle = employee.getJobTitle();
            double salary = employee.getSalary();
            averageSalaries.merge(jobTitle, salary, Double::sum);
            jobTitleCounts.merge(jobTitle, 1, Integer::sum);
        }

        averageSalaries.replaceAll((jobTitle, totalSalary) -> totalSalary / jobTitleCounts.get(jobTitle));
        return averageSalaries;
    }

}
