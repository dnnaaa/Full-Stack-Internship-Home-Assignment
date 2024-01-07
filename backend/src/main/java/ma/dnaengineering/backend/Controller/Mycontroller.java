package ma.dnaengineering.backend.Controller;

import java.io.InputStreamReader;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import ma.dnaengineering.backend.Service.csvService;
import ma.dnaengineering.backend.entities.Employee;

@RestController
@RequestMapping("/api/csv")
@CrossOrigin(origins = "http://localhost:3000")
public class Mycontroller {
	
	private final csvService csvservice;
	public Mycontroller(csvService csvservice) {
        this.csvservice = csvservice;
    }
	 @PostMapping("/upload")
	    public ResponseEntity<String> handleFileUpload(@RequestParam("file") MultipartFile file) {
	        try {
	            // Directly pass the input stream from the uploaded file to the service
	            csvservice.processAndSaveCsv(file.getInputStream());
	            return ResponseEntity.ok("File uploaded successfully.");
	        } catch (Exception e) {
	            e.printStackTrace();
	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error uploading the file.");
	        }
	    }

	
	@GetMapping("/employees")
    public ResponseEntity<List<Employee>> getAllEmployees() {
        List<Employee> employees = csvservice.getAllEmployees();
        return ResponseEntity.ok(employees);
    }
	
	@GetMapping("/jobsSummary")
    public ResponseEntity<Map<String, Double>> getJobsSummary() {
        // Fetch the jobs summary from the service
        Map<String, Double> jobsSummary = csvservice.getJobsSummary();
        return ResponseEntity.ok(jobsSummary);
    }
	
}
