package ma.dnaengineering.backend.service;

import com.opencsv.CSVReader;
import com.opencsv.exceptions.CsvValidationException;
import ma.dnaengineering.backend.model.Employee;
import ma.dnaengineering.backend.model.Job;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.*;

@Service
public class EmployeService {



    public List<Employee> readEmployeesFromCsv(byte[] fileContent) throws IOException {
        List<Employee> employees = new ArrayList<>();

        try (CSVReader reader = new CSVReader(new InputStreamReader(new ByteArrayInputStream(fileContent)))) {

            reader.readNext();

            String[] line;
            while ((line = reader.readNext()) != null) {
                Employee employee = new Employee();
                employee.setId(Long.parseLong(line[0]));
                employee.setName(line[1]);
                employee.setJobTitle(line[2]);
                employee.setSalary(Double.parseDouble(line[3]));
                employees.add(employee);
            }
        } catch (CsvValidationException e) {
            throw new RuntimeException(e);
        }
        return employees;
    }
    public Map<String, List<Employee>> groupEmployeesByTitle(List<Employee> employees) {
        Map<String, List<Employee>> map = new HashMap<>();
        for (Employee emp : employees) {
            String title = emp.getJobTitle();
            //new Syntaxe
            map.computeIfAbsent(title, k -> new ArrayList<>());
            map.get(title).add(emp);
        }
        return map;
    }

    public List<Job> calculateAvgSalaryByTitle(Map<String, List<Employee>> groups) {
        List<Job> jobs = new ArrayList<>();
        for (String title : groups.keySet()) {
            List<Employee> employees = groups.get(title);

            double totalSalary = employees.stream().mapToDouble(Employee::getSalary).sum();
            double avg = totalSalary / employees.size();

            Job job = new Job();
            job.setTitle(title);
            job.setAverageSalary(avg);
            jobs.add(job);
        }
        return jobs;
    }
}
