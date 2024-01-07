package ma.dnaengineering.backend.service;

import com.opencsv.CSVReader;
import ma.dnaengineering.backend.entity.CSVData;
import ma.dnaengineering.backend.entity.Employee;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class DocumentService {

    public CSVData parseCSVFile(MultipartFile file) throws Exception {
        try (CSVReader csvReader = new CSVReader(new BufferedReader(new InputStreamReader(file.getInputStream())))) {
            String[] headers = csvReader.readNext();
            if (headers == null || headers.length == 0) {
                throw new Exception("Invalid CSV file");
            }

            Map<String, List<Employee>> employeesByJobTitle = new HashMap<>();
            String[] line;
            while ((line = csvReader.readNext()) != null) {
                Employee employee = parseEmployee(line, headers);
                String jobTitle = employee.getJobTitle();

                if (!employeesByJobTitle.containsKey(jobTitle)) {
                    employeesByJobTitle.put(jobTitle, new ArrayList<>());
                }
                employeesByJobTitle.get(jobTitle).add(employee);
            }

            return new CSVData(employeesByJobTitle);
        }
    }

    private Employee parseEmployee(String[] data, String[] headers) {
        Employee employee = new Employee();
        for (int i = 0; i < headers.length; i++) {
            String header = headers[i];
            String value = data[i];

            switch (header) {
                case "id":
                    employee.setId(value);
                    break;
                case "employee_name":
                    employee.setName(value);
                    break;
                case "job_title":
                    employee.setJobTitle(value);
                    break;
                case "salary":
                    employee.setSalary(Double.parseDouble(value));
                    break;
            }
        }
        return employee;
    }

}
