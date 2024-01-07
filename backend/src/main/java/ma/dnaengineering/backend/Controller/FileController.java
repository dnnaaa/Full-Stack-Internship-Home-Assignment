package ma.dnaengineering.backend.Controller;

import ma.dnaengineering.backend.Entity.Employees;
import ma.dnaengineering.backend.Response.ResponseMessage;
import ma.dnaengineering.backend.Service.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("files")
@CrossOrigin(origins = "http://localhost:3000")
public class FileController {
    @Autowired
    private FileService Service;
    @GetMapping("/employees")
    public ResponseEntity<List<Employees>> getAllEmployees(){
        List<Employees> employees = Service.getAllEmployees();
        return ResponseEntity.ok(employees);
    }
    @GetMapping("/averageSalary")
    public ResponseEntity<?> getAverageSalaryByJobTitle(){
        Map<String, Double> averageSalaries = Service.getAverageSalaryByJobTitle();
        return ResponseEntity.ok(averageSalaries);
    }
    @PostMapping("/upload")
    public ResponseEntity<ResponseMessage> uploadFile() {
        Service.SaveData();
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage("File Uploaded successfully: " ));
    }

    @PostMapping("/csvformat")
    public ResponseEntity<ResponseMessage> csvformat() {
        if(Service.hasCsvFormat())
            return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage("File Uploaded has csv format: " ));
        return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new ResponseMessage("File Uploaded has not csv format: " ));

    }


}
