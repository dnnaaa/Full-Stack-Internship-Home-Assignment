package ma.dnaengineering.backend.Controllers;

import ma.dnaengineering.backend.Exceptions.InvalidFileFormatException;
import ma.dnaengineering.backend.Models.Employee;
import ma.dnaengineering.backend.Services.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.sql.SQLOutput;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000/")
@RequestMapping("/employees")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @PostMapping("/")
    public Map<String, Object> EmployeesProccess(@RequestParam("file") MultipartFile file) {
        if (!file.getOriginalFilename().endsWith(".csv")) {
            throw new InvalidFileFormatException("Invalid file format. Only CSV files are allowed.");
        }
        return employeeService.processCSV(file);
    }

}
