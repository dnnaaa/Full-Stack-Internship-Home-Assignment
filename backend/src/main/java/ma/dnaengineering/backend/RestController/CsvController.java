package ma.dnaengineering.backend.RestController;

import lombok.RequiredArgsConstructor;
import ma.dnaengineering.backend.persistence.Employee;
import ma.dnaengineering.backend.service.CsvParserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/csv")
@CrossOrigin()
@RequiredArgsConstructor
public class CsvController {

    private final CsvParserService csvParserService;

    @GetMapping("/test")
    public  ResponseEntity<String> test(){
        return ResponseEntity.ok("No problems :) ");
    }

    @PostMapping("/process")
    public ResponseEntity<List<Employee>> precessCsv(@RequestParam("file") MultipartFile file) {

        if (file.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }

        try {
            List<Employee> employees = csvParserService.parseCsv(file);
            return ResponseEntity.ok(employees);
        } catch (IOException e) {
            e.printStackTrace(); // Log the exception for debugging purposes
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}
