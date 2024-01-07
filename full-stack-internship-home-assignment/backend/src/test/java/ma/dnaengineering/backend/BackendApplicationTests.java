package ma.dnaengineering.backend;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import java.io.IOException;
import java.util.Collections;
import java.util.List;
import java.util.Map;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;

import ma.dnaengineering.backend.controller.EmployeeController;
import ma.dnaengineering.backend.entitys.Employee;
import ma.dnaengineering.backend.services.FileService;

@WebMvcTest(EmployeeController.class)
public class BackendApplicationTests {

    @Autowired
    private EmployeeController employeeController;

    @MockBean
    private FileService fileService;

    @BeforeEach
    public void setUp() throws IOException {
        List<Employee> mockEmployees = Collections.singletonList(new Employee(1L, "John", "Developer", 5000.0));
        Map<String, Double> mockAverages = Collections.singletonMap("Developer", 5000.0);

        when(fileService.readFile(any(MultipartFile.class))).thenReturn(mockEmployees);
        when(fileService.calculateAverageSalaryByJobTitle(mockEmployees)).thenReturn(mockAverages);
    }

    @Test
    public void testParseCSV_Success() throws IOException {
        MultipartFile file = new MockMultipartFile("file", "employees.csv", "text/csv", "mock data".getBytes());

        ResponseEntity<Map<String, Object>> responseEntity = employeeController.parseCSV(file);

        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());

        Map<String, Object> responseBody = responseEntity.getBody();
    }


}
