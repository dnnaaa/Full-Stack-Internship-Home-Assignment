package ma.dnaengineering.backend.Controller;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import ma.dnaengineering.backend.Entities.Employee;
import ma.dnaengineering.backend.Service.EmployeeService;


@RestController
@RequestMapping("/api/employees")
@CrossOrigin(origins = "http://localhost:3000")
public class CSVController {


@Autowired
private EmployeeService employeeService;


@PostMapping("/upload")

public   ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) throws IOException{

    try {

         employeeService.readCSV(file.getInputStream());

         return ResponseEntity.ok().body("File uploaded successfully!");

    } catch (Exception e) {
        e.printStackTrace();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error processing file");
        
    }


}

@GetMapping("/getJobSummary")
public ResponseEntity<Map<String,Double>> getEmployeeSummary(@RequestParam int page, @RequestParam int pageSize) {


    try {

        Map<String,Double> summary=employeeService.calculateAverageSlaryByJobTitle(page, pageSize);

        return ResponseEntity.ok().body(summary);

    } catch (Exception e) {
        e.printStackTrace();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }


}


@GetMapping("/getEmployees")
public ResponseEntity<List<Employee>> getEmployees(@RequestParam int page, @RequestParam int pageSize) throws IOException{
  

    try {
        
        List<Employee> employees=employeeService.getEmployees(page,pageSize);

        return ResponseEntity.ok().body(employees);

    } catch (Exception e) {
        e.printStackTrace();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }

}

    
}
