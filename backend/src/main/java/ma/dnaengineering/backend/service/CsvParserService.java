package ma.dnaengineering.backend.service;

import com.opencsv.CSVReader;
import com.opencsv.exceptions.CsvException;
import ma.dnaengineering.backend.model.Employee;
import ma.dnaengineering.backend.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.FileReader;
import java.io.IOException;
import java.util.List;

@Service
public class CsvParserService {

    private final String CSV_FILE_PATH = "data/employees.csv";
    @Autowired
    private EmployeeRepository employeeRepository;

    public List<Employee> parseCsv(String filePath) {
        try (CSVReader reader = new CSVReader(new FileReader(filePath))) {
            List<String[]> csvData = reader.readAll();
            return convertCsvToEmployees(csvData);
        } catch (IOException | CsvException e) {
            e.printStackTrace(); // Handle the exception appropriately
            return null;
        }
    }

    public Employee addEmployee(Employee employee) {
        // Save the employee to the database using the repository
        return employeeRepository.save(employee);
    }

    private List<Employee> convertCsvToEmployees(List<String[]> csvData) {
        // Assuming the CSV structure is id, name, jobTitle, salary
        List<Employee> employees = csvData.stream()
                .skip(1) // Skip the header row
                .map(row -> new Employee(
                        Integer.parseInt(row[0]),
                        row[1],
                        row[2],
                        Double.parseDouble(row[3])
                ))
                .toList();

        System.out.println("Converted Employees: " + employees);
        return employees;
    }
}






