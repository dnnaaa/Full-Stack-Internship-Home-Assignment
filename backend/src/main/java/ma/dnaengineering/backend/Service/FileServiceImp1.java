package ma.dnaengineering.backend.Service;

import ma.dnaengineering.backend.Entity.Employees;
import ma.dnaengineering.backend.Repository.EmployeeRepository;
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
public class FileServiceImp1 implements FileService{
    String filep = "E:\\Projet DNA\\Full-Stack-Internship-Home-Assignment\\data\\employees.csv";


    private final ResourceLoader resourceLoader;
    public FileServiceImp1(ResourceLoader resourceLoader) {
        this.resourceLoader = resourceLoader;
    }
    @Autowired
    private EmployeeRepository repository;



    public boolean hasCsvFormat(String filep) {
        return false;
    }

    @Override
    public boolean hasCsvFormat() {
        String type = "text/csv";
        try (BufferedReader fileReader = new BufferedReader(new FileReader(filep))) {
            // Read the first line to check if it's a CSV file
            String firstLine = fileReader.readLine();
            return firstLine != null && firstLine.startsWith("id,employee_name,job_title,salary");
        } catch (IOException e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public void SaveData() {
        List<Employees> employees = csvToEmployee();
        repository.saveAll(employees);
    }





    private List<Employees> csvToEmployee() {
        try (BufferedReader fileReader = new BufferedReader(new FileReader("E:\\Projet DNA\\Full-Stack-Internship-Home-Assignment\\data\\employees.csv"));
             CSVParser csvparser = new CSVParser(fileReader,
                     CSVFormat.DEFAULT.withFirstRecordAsHeader().withIgnoreHeaderCase().withTrim())) {
            List<Employees> employees= new ArrayList<>();
            List<CSVRecord> records = csvparser.getRecords();
            for (CSVRecord csvRecord : records) {
                Employees employee = new Employees(
                        Long.parseLong(csvRecord.get("id")),
                        csvRecord.get("employee_name"),
                        csvRecord.get("job_title"),
                        Double.parseDouble(csvRecord.get("salary"))
                );
                employees.add(employee);

            }
            return employees;
        } catch (IOException e) {
            e.printStackTrace();
            // Handle the exception by either throwing it or returning an empty list
            throw new RuntimeException("Error reading CSV file", e);
        }

    }

    @Override
    public void SaveData(MultipartFile filep) {

    }

    @Override
    public boolean hasCsvFormat(MultipartFile filep) {
        return false;
    }

    @Override
    public void processAndSaveData(MultipartFile file) throws IOException {

    }

    @Override
    public List<Employees> getAllEmployees() {
        return repository.findAll();
    }

    @Override
    public Map<String, Double> getAverageSalaryByJobTitle() {
        return getAllEmployees().stream().collect(Collectors.groupingBy(Employees::getJob_title,
                Collectors.averagingDouble(employees -> employees.getSalary())));
    }
}