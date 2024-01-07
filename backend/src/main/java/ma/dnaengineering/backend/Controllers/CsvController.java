package ma.dnaengineering.backend.Controllers;

import ma.dnaengineering.backend.Models.Employe;
import ma.dnaengineering.backend.Services.CsvService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/test")
public class CsvController {

    @Autowired
    private CsvService csvParserService;

    @GetMapping("/parse-csv")
    public Map<String, Object> parseCsv(@RequestParam String filePath) throws IOException {
        String FilePath = "../data/"+filePath;
        List<Employe> employees = csvParserService.parseCsv(FilePath);
        Map<String, Double> averageSalaries = csvParserService.calculateAverageSalary(employees);

        Map<String, Object> result = new HashMap<>();
        result.put("employees", employees);
        result.put("averageSalaries", averageSalaries);

        return result;
    }
}
