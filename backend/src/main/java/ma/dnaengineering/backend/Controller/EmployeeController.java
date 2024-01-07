package ma.dnaengineering.backend.Controller;

import ma.dnaengineering.backend.DTO.Employee;
import ma.dnaengineering.backend.DTO.JobSalary;
import ma.dnaengineering.backend.Service.EmployeeServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;


@RestController
@CrossOrigin("*")
@RequestMapping("api/employees")
public class EmployeeController {

    @Autowired
    private EmployeeServiceImpl csvParserService;

    @GetMapping(path = "/All/{filePath}")
    public List<Employee> getEmployees(@PathVariable(value = "filePath") String filePath) throws IOException  {
        String file = "data/"+filePath;
        return csvParserService.parseCsv(file);
    }

    @GetMapping(path = "/average-salary-by-job-title/{filePath}")
    public List<JobSalary> getAverageSalaryByJobTitle(@PathVariable String filePath) {
        try {
            String filePathh = "data/" + filePath;
            List<Employee> employees = csvParserService.parseCsv(filePathh);
            return csvParserService.calculateAverageSalaryByJobTitle(employees);
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }
}
