package ma.dnaengineering.backend;
import java.io.IOException;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import ma.dnaengineering.backend.EmployeeService.EmployeeData;


@RestController
@RequestMapping("/employees") // Define the base path for employee-related APIs
public class EmployeeController {

    private final EmployeeService employeeService;

    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @GetMapping("/process-csv")
    public ResponseEntity<EmployeeData> processCSVFile(@RequestParam("file") MultipartFile file)  {
        try{
        EmployeeData employeeData = employeeService.processCSVFile(file); 
        return new ResponseEntity<>(employeeData, HttpStatus.OK);}
        catch(IOException e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @PostMapping("/upload-csv")
    public ResponseEntity<EmployeeData> uploadCSVFile(@RequestParam("file") MultipartFile file)  {
        try{
        EmployeeData employeeData = employeeService.processCSVFile(file); 
        return new ResponseEntity<>(employeeData, HttpStatus.OK);}
        catch(IOException e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping("/average-salaries")
    public ResponseEntity<Map<String, Double>> getAverageSalaries() {
        Map<String, Double> averageSalaries = employeeService.calculateAverageSalaries();
        return new ResponseEntity<>(averageSalaries, HttpStatus.OK);
    }

}
