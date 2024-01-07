package ma.dnaengineering.backend;

import static org.junit.jupiter.api.Assertions.assertEquals;
import java.io.FileInputStream;
import java.io.IOException;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.core.io.ClassPathResource;
import org.springframework.data.domain.Page;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;

import ma.dnaengineering.backend.dao.EmployeeDao;
import ma.dnaengineering.backend.model.Employee;
import ma.dnaengineering.backend.service.EmployeeService;

@SpringBootTest
public class EmployeeServiceTest {

    @Autowired
    private EmployeeService employeeService;

    @Autowired
    private EmployeeDao employeeRepository;

    void saveEmployees() throws IOException  {
        ClassPathResource resource = new ClassPathResource("employees.csv");
        Path filePath = resource.getFile().toPath();    
        MultipartFile file = new MockMultipartFile("employee", new FileInputStream(filePath.toString()));
    
        employeeService.saveEmployees(file);
    }

    @Test
    void saveEmployeesWorks() throws IOException{
        saveEmployees();

        List<Employee> employees = employeeRepository.findAll();
        assertEquals(1000,employees.size()); 
     }
 
    @Test
    void getAllEmployeesSortedByName() throws IOException {
        saveEmployees();

        Page<Employee> resultPage = employeeService.getAllEmployeesSortedByName(0, 10);
        assertEquals(10, resultPage.getSize()); 
    }
   
    @Test
    void getJobSummaries() throws IOException {

        employeeRepository.saveAll(new ArrayList<>(Arrays.asList(
            new Employee(1L, "John Doe", "Software Engineer", 80000.0),
            new Employee(2L, "Jane Smith", "Product Manager", 100000.0),
            new Employee(3L, "Bob Johnson", "Software Engineer", 75000.0),
            new Employee(4L, "Alice Brown", "Software Engineer", 85000.0),
            new Employee(5L, "Charlie Davis", "Systems Architect", 90000.0)
        )));

        Map<String, Double> result = employeeService.getJobSummaries();
        assertEquals(80000.0, result.get("Software Engineer"));
        assertEquals(100000.0, result.get("Product Manager"));
        assertEquals(90000.0, result.get("Systems Architect"));
    }
    
    
    
}
