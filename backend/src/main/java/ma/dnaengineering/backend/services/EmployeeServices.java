package ma.dnaengineering.backend.services;

import com.opencsv.CSVReader;
import com.opencsv.exceptions.CsvValidationException;
import ma.dnaengineering.backend.models.Employee;
import ma.dnaengineering.backend.models.Job;
import org.springframework.core.io.ClassPathResource;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class EmployeeServices {
    private static final String CSV_FILE_PATH = "C:\\data\\employees.csv";
    private static final String PATH_TO_UPLOAD = "C:\\data\\upload";

    public List<Employee> readEmployeesFromCsv(byte [] fileContent) throws IOException, CsvValidationException {
        List<Employee> employees = new ArrayList<>();

        try (CSVReader reader = new CSVReader(new InputStreamReader(new ByteArrayInputStream(fileContent)))) {
            String[] line;
            reader.readNext();
            while ((line = reader.readNext()) != null) {
                Long id = Long.parseLong(line[0]);
                String name = line[1];
                String jobTitle = line[2];
                Double salary = Double.parseDouble(line[3]);

                Employee employee = new Employee(id, name, jobTitle, salary);
                employees.add(employee);
            }
        }
        return employees;
    }


    public Map<String, List<Employee>> groupEmployeeByJobTitle(List<Employee> employees) throws IOException {

        Map<String, List<Employee>> employeesByJobTitle = new HashMap<>();


        for (Employee employee : employees) {
            String jobTitle = employee.getJobTitle();

            if (employeesByJobTitle.containsKey(jobTitle)) {

                employeesByJobTitle.get(jobTitle).add(employee);
            } else {
                List<Employee> employeesList = new ArrayList<>();
                employeesList.add(employee);
                employeesByJobTitle.put(jobTitle, employeesList);
            }
        }

        return employeesByJobTitle;
    }

    public List<Job> JobsStatistics(Map<String, List<Employee>> employeeByJobTitle) {
        List<Job> jobs = new ArrayList<>();

        // Iterate through the employeesByJobTitle map
        for (Map.Entry<String, List<Employee>> entry : employeeByJobTitle.entrySet()) {
            String jobTitle = entry.getKey();
            List<Employee> employeesList = entry.getValue();

            // Calculate average salary for the current job title
            int totalEmp = 0 ;
            Double totalSalary = 0.0;
            for(Employee employee : employeesList){
                totalEmp++;
                totalSalary+=employee.getSalary();
            }
            double averageSalary = totalSalary/totalEmp;

            // Create a new Job object and add it to the list
            Job job = new Job(jobTitle, averageSalary);
            jobs.add(job);

        }
        return jobs;

    }
    public String uploadFile(MultipartFile file) throws IOException {
        Path uploadPath = Path.of("C:\\data\\upload");
        Files.createDirectories(uploadPath);

        // Get the original filename to prevent conflicts
        String originalFilename = file.getOriginalFilename();
        System.out.println(originalFilename);

        // Resolve the path for the uploaded file
        Path filePath = uploadPath.resolve(originalFilename);

        // Copy the file to the upload directory
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        // Return the absolute path of the uploaded file
        return filePath.toAbsolutePath().toString();
    }

}