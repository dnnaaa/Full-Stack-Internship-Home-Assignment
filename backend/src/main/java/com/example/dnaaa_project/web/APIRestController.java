package com.example.dnaaa_project.web;

import com.example.dnaaa_project.entities.Employee;
import com.example.dnaaa_project.entities.Job;
import com.example.dnaaa_project.repository.EmployeeRepository;
import com.opencsv.bean.CsvToBean;
import com.opencsv.bean.CsvToBeanBuilder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.Reader;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
public class APIRestController {

    private EmployeeRepository employeeRepository;


    public APIRestController(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;

    }

    @GetMapping("/employees")
    public List<Employee> employees(){
        return employeeRepository.findAll();
    }


    @GetMapping("/emp")
    public List<Employee> emplyeesbyjob(@RequestParam(name = "job_name") String job_name){
        List<Employee> employees = employeeRepository.findAllByJobTitleIgnoreCase(job_name);
        return employees;
    }

    @GetMapping("/statics")
    public List<Job> statics(){
        List<Job> jobs=new ArrayList<>();
        List<String> list = employeeRepository.findAll().stream().map(Employee::getJob_title).distinct().collect(Collectors.toList());
        list.forEach(s -> {

            List<Employee> all = employeeRepository.findAllByJobTitleIgnoreCase(s);
            Double sum=0.0;
            for (Employee e:all) {
                sum=sum+e.getSalary();
            }
            Job job= Job.builder()
                    .job_title(s)
                    .average_salary(sum/all.size())
                    .build();

            jobs.add(job);



        });

        return jobs;
    }


    @PostMapping("/upload-csv-file")
    public String uploadCSVFile(@RequestParam("file") MultipartFile file) {

        // validate file
        if (file.isEmpty()) {
            throw new RuntimeException("file empty");
        } else {

            // parse CSV file to create a list of `User` objects
            try (Reader reader = new BufferedReader(new InputStreamReader(file.getInputStream()))) {

                // create csv bean reader
                CsvToBean<Employee> csvToBean = new CsvToBeanBuilder(reader)
                        .withType(Employee.class)
                        .withIgnoreLeadingWhiteSpace(true)
                        .build();

                // convert `CsvToBean` object to list of users
                List<Employee> employees = csvToBean.parse();

                employees.forEach(em->{
                    System.out.println(em);
                });

                // TODO: save users in DB?

                employeeRepository.saveAll(employees);


            } catch (Exception ex) {
                ex.printStackTrace();
            }
        }

        return "file-upload-status";
    }




}
