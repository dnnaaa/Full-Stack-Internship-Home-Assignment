package ma.dnaengineering.backend.web;


import ma.dnaengineering.backend.service.ICsvService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;

@RestController
@RequestMapping("/api/resources")
@CrossOrigin(origins = "http://localhost:3000")
public class CsvController {

	@Autowired
	ICsvService csvService;

	@PostMapping("/uploadFile")
	public ResponseEntity<CsvResponse> uploadCsv(@RequestParam("file") MultipartFile multipartFile){

		try {
			CsvResponse employeeList = csvService.getDataFromCsv(multipartFile);
			return ResponseEntity.ok(employeeList);
		} catch (IOException e) {
			e.printStackTrace();
			return ResponseEntity.status(500).body(null);
		}
	}

}
