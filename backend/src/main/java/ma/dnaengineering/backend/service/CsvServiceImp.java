package ma.dnaengineering.backend.service;

import com.opencsv.CSVReader;
import com.opencsv.exceptions.CsvException;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import ma.dnaengineering.backend.models.*;

import java.io.FileReader;
import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;
@Component
@Service
public class CsvServiceImp implements CsvService{
    private static final String CSV_FILE_PATH = "full-stack-internship-home-assignment/data/employees.csv";
    @Override
    public List<Employee> getEmployees() {
        try (CSVReader csvReader = new CSVReader(new FileReader(CSV_FILE_PATH))) {
            return csvReader.readAll().stream()
                    .skip(1) //skip the first row:id
                    .map(this::mapToEmployee)//map stream elements to an object of type employee
                    .collect(Collectors.toList());//covert stream to list
        } catch (IOException | CsvException e) {
            throw new RuntimeException("Error reading CSV file", e);
        }
    }
@ Override
    public List<JobSummary> getJobSummary() {
        List<Employee> employees = getEmployees();

        Map<String, List<Double>> jobTitleSalaries = employees.stream()
                .collect(Collectors.groupingBy(Employee::getJob_title,
                        Collectors.mapping(Employee::getSalary, Collectors.toList())));

        return jobTitleSalaries.entrySet().stream()
                .map(entry -> new JobSummary(entry.getKey(), calculateAverageSalary(entry.getValue())))
                .collect(Collectors.toList());
    }

    private double calculateAverageSalary(List<Double> salaries) {
        return salaries.stream().mapToDouble(Double::doubleValue).average().orElse(0.0);
    }

    private Employee mapToEmployee(String[] record) {
        return new Employee(
                Long.parseLong(record[0]),//id
                record[1],//employee name
                record[2],//job title
                Double.parseDouble(record[3])// salary
        );
    }
}

