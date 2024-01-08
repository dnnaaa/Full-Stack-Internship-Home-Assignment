package ma.dnaengineering.backend.controller;

import ma.dnaengineering.backend.model.Employee;
import ma.dnaengineering.backend.model.FileProcessingResult;
import ma.dnaengineering.backend.model.Job;
import ma.dnaengineering.backend.service.EmployeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class EmployeeController {

    @Autowired
    private EmployeService employeService;

// methode au debut pour test
//    @GetMapping({"/employes"})
//    public List<Employee> getAllEmployes() throws IOException {
//        List<Employee> employees= employeService.readEmployeesFromCsv();
//        for(Employee employee : employees){
//            System.out.println(employee);
//        }
//   return employees;
//    }

  // methode au debut pour test
//    @GetMapping({"/jobs"})
//    public List<Job> getAllJobs() throws IOException {
//        List<Employee> employees= employeService.readEmployeesFromCsv();
//        Map<String,List<Employee>> groupee=employeService.groupEmployeesByTitle(employees);
//
//        List<Job> jobs=employeService.calculateAvgSalaryByTitle(groupee);
//
//        for(Job employee : jobs){
//            System.out.println(employee);
//        }
//        return jobs;
//    }

    @PostMapping("/upload")
    public FileProcessingResult uploadFile(@RequestParam("file") MultipartFile file) throws IOException {
        byte[] fileContent = file.getBytes();

        List<Employee> employees = employeService.readEmployeesFromCsv(fileContent);


        Map<String, List<Employee>> groupedEmployees = employeService.groupEmployeesByTitle(employees);
        List<Job> jobs = employeService.calculateAvgSalaryByTitle(groupedEmployees);




        return new FileProcessingResult(employees,jobs);
    }




}
