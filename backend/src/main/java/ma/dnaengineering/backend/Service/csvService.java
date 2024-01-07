package ma.dnaengineering.backend.Service;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import ma.dnaengineering.backend.entities.Employee;
import ma.dnaengineering.backend.entities.MyOwnCsvparser;
import ma.dnaengineering.backend.repositories.EmployeeRepository;

@Service
public class csvService {
	private final EmployeeRepository employeeRepository;
	

    public csvService(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    public void processAndSaveCsv(InputStream inputStream){
    	try {
            MyOwnCsvparser csvParser = new MyOwnCsvparser();
            List<Employee> employees = csvParser.parseCsv(new InputStreamReader(inputStream));
            employeeRepository.saveAll(employees);
        } catch (IOException e) {
            throw new RuntimeException("Error processing and saving CSV file", e);
        }
    }
    
    
    public List<Employee> getAllEmployees() {
        // Fetch all employees from the database
        return employeeRepository.findAll();
    }
    
    public Map<String, Double> getJobsSummary() {
        List<Object[]> jobsSummaryData = employeeRepository.getJobsSummary();
        Map<String, Double> jobsSummary = new HashMap<>();

        for (Object[] row : jobsSummaryData) {
            String jobTitle = (String) row[0];
            Double averageSalary = (Double) row[1];

            jobsSummary.put(jobTitle, averageSalary);
        }

        return jobsSummary;
    }

}
