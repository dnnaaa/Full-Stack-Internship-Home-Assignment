package com.example.dnaaa_project.services;

import com.example.dnaaa_project.entities.Employee;
import com.example.dnaaa_project.repository.EmployeeRepository;
import com.opencsv.CSVReader;
import com.opencsv.exceptions.CsvValidationException;
import org.springframework.stereotype.Service;

import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;


@Service
public class service {

    private EmployeeRepository employeeRepository;

    public service(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    public List<Employee> readCsv() throws IOException {
        List<Employee> employees = new ArrayList<>();
        String filePath = "C:\\Users\\lenovo\\SDIA\\dnaaa_project\\src\\main\\java\\com\\example\\dnaaa_project\\data\\employees.csv";
        try (CSVReader reader = new CSVReader(new FileReader(filePath))) {
            String[] line;
            reader.skip(1);

            while ((line = reader.readNext()) != null) {
                Employee employee=new Employee();
                employee.setId((long) Integer.parseInt(line[0]));
                employee.setEmployee_name(line[1]);
                employee.setJob_title(line[2]);
                employee.setSalary(Double.parseDouble(line[3]));
                employees.add(employee);
                employeeRepository.save(employee);
            }

        } catch (CsvValidationException e) {
            throw new RuntimeException(e);
        }

        return employees;
    }








}
