package ma.dnaengineering.backend.controllers;

import lombok.RequiredArgsConstructor;

import ma.dnaengineering.backend.dtos.ResponseDto;
import ma.dnaengineering.backend.services.EmployeeService;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;


@RestController
@RequestMapping("/employees")
@RequiredArgsConstructor
public class EmployeeController {
    private  final EmployeeService employeeService;
    @PostMapping("/processCSV")
    public ResponseDto processCSV(@RequestPart("file") MultipartFile file) {
        try {
            ResponseDto responseDto = employeeService.processCSV(file);
           return  responseDto;
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
