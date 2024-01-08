package ma.dnaengineering.backend.controllers;

import com.opencsv.exceptions.CsvValidationException;
import ma.dnaengineering.backend.models.DataWrapper;
import ma.dnaengineering.backend.models.Employee;
import ma.dnaengineering.backend.models.Job;
import ma.dnaengineering.backend.services.EmployeeServices;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/")
public class EmployeeController {
    EmployeeServices employeeServices = new EmployeeServices();


//    @GetMapping("/employees")
//    public List<Employee> getEmployees() throws CsvValidationException, IOException {
//
//
////        List<Employee> employees = employeeServices.readEmployeesFromCsv();
//        Map<String, List<Employee>> employeeByJobTitle = employeeServices.groupEmployeeByJobTitle(employees);
//        List<Job> jobs = employeeServices.JobsStatistics(employeeByJobTitle);
//
//        for (Employee employee : employees) {
//            System.out.println(employee);
//        }
//
//        for (Job job : jobs) {
//            System.out.println(job);
//        }
//        return employees ;
//    }

//    @GetMapping("/jobs")
//    public List<Job> getJobs() throws CsvValidationException, IOException {
//
//
//        List<Employee> employees = employeeServices.readEmployeesFromCsv();
//        Map<String, List<Employee>> employeeByJobTitle = employeeServices.groupEmployeeByJobTitle(employees);
//        List<Job> jobs = employeeServices.JobsStatistics(employeeByJobTitle);
//
//        for (Employee employee : employees) {
//            System.out.println(employee);
//        }
//
//        for (Job job : jobs) {
//            System.out.println(job);
//        }
//        return jobs ;
//    }

    @PostMapping("/upload")
    public DataWrapper uploadFile(@RequestParam("file") MultipartFile file) {
        DataWrapper dataWrapper = null;
        try {
            // Call the service method to handle the file upload
            byte[] contentFile = file.getBytes();
            List<Employee> employees = employeeServices.readEmployeesFromCsv(contentFile);
            Map<String, List<Employee>> employeeByJobTitle = employeeServices.groupEmployeeByJobTitle(employees);
            List<Job> jobs = employeeServices.JobsStatistics(employeeByJobTitle);
            dataWrapper = new DataWrapper(employees, jobs);



        } catch (IOException e) {
            e.printStackTrace();

        } catch (CsvValidationException e) {
            throw new RuntimeException(e);
        }
        return dataWrapper;
}

}
