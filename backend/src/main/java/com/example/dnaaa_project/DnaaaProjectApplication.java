package com.example.dnaaa_project;

import com.example.dnaaa_project.entities.Employee;
import com.example.dnaaa_project.repository.EmployeeRepository;
import com.example.dnaaa_project.services.service;
import org.h2.expression.function.table.CSVReadFunction;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;



@SpringBootApplication
public class DnaaaProjectApplication {

    public static void main(String[] args) {
        SpringApplication.run(DnaaaProjectApplication.class, args);
    }

    @Bean
    CommandLineRunner start(service service, EmployeeRepository employeeRepository){
        return args -> {


        };
    }

}
