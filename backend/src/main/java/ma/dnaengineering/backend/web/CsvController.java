package ma.dnaengineering.backend.web;

import lombok.AllArgsConstructor;
import ma.dnaengineering.backend.entities.Employee;
import ma.dnaengineering.backend.parser.CSVParser;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@AllArgsConstructor
public class CsvController {

    private final CSVParser csvParser;


    @PostMapping("/parse")
    public ResponseEntity<List<Employee>> parseCSV(@RequestParam("file") MultipartFile file) {
        List<Employee> parsedData = csvParser.parse(file);
        return ResponseEntity.ok(parsedData);
    }

    @PostMapping("/average-salary")
    public ResponseEntity<Map<String, Double>> calculateAverageSalary(@RequestParam("file") MultipartFile file) {
        List<Employee> parsedData = csvParser.parse(file);
        Map<String, Double> averageSalaries = csvParser.calculateAverageSalary(parsedData);
        return ResponseEntity.ok(averageSalaries);
    }


}
