package ma.dnaengineering.backend.service;

import ma.dnaengineering.backend.entity.Employee;
import ma.dnaengineering.backend.repository.EmployeeRepository;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class FileServiceImpl implements FileService{
    String filePath = "E:\\Projects\\SpringProjects\\DNAProject\\Full-Stack-Internship-Home-Assignment\\data\\employees.csv";


    private final ResourceLoader resourceLoader;
    public FileServiceImpl(ResourceLoader resourceLoader) {
        this.resourceLoader = resourceLoader;
    }
    @Autowired
    private EmployeeRepository repository;

    @Override
    public boolean hasCSVformat(MultipartFile filePath) {
        return false;
    }

    @Override
    public boolean hasCSVformat(String filePath) {
        return false;
    }

    @Override
    public boolean hasCSVformat() {
        String type = "text/csv";
        try (BufferedReader fileReader = new BufferedReader(new FileReader(filePath))) {
            // Read the first line to check if it's a CSV file
            String firstLine = fileReader.readLine();
            return firstLine != null && firstLine.startsWith("id,employee_name,job_title,salary");
        } catch (IOException e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public Map<String, Double> getAverageSalaryByJobTitle() {
        // Calculate the average salary for each job title
        return getAllEmployees().stream()
                .collect(Collectors.groupingBy(Employee::getJobTitle,
                        Collectors.averagingDouble(employee -> employee.getSalary())));
    }
    @Override
    public List<Employee> getAllEmployees() {
        return repository.findAll();
    }

    @Override
    public void SaveData(MultipartFile filePath) {

    }


    @Override
    public void SaveData() {
        List<Employee> employees = csvToEmployee();
        repository.saveAll(employees);
    }

    public List<Employee> csvToEmployee() {
        try {

            BufferedReader fileReader = new BufferedReader(new FileReader("E:\\Projects\\SpringProjects\\DNAProject\\Full-Stack-Internship-Home-Assignment\\data\\employees.csv"));

            CSVParser csvparser = new CSVParser(fileReader,
                    CSVFormat.DEFAULT.withFirstRecordAsHeader().withIgnoreHeaderCase().withTrim());

            List<Employee> employees = new ArrayList<>();
            List<CSVRecord> records = csvparser.getRecords();

            for (CSVRecord csvRecord : records) {
                Employee employee = new Employee(
                        Long.parseLong(csvRecord.get("id")),
                        csvRecord.get("employee_name"),
                        csvRecord.get("job_title"),
                        Double.parseDouble(csvRecord.get("salary")));
                employees.add(employee);
            }

            return employees;
        } catch (IOException e) {
            e.printStackTrace();
            // Handle the exception by either throwing it or returning an empty list
            throw new RuntimeException("Error reading CSV file", e);
        }
    }

}
