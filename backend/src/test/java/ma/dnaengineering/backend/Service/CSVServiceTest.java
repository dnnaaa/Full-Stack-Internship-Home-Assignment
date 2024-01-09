package ma.dnaengineering.backend.Service;

import ma.dnaengineering.backend.model.Employee;
import ma.dnaengineering.backend.repository.EmployeeRepository;
import ma.dnaengineering.backend.service.CSVService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.client.RestTemplate;

import java.io.ByteArrayInputStream;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@SpringBootTest
public class CSVServiceTest {

    @Autowired
    private CSVService csvService;

    @MockBean
    private EmployeeRepository employeeRepository;

    @MockBean
    private RestTemplate restTemplate;

    private List<Employee> mockEmployees;

    @BeforeEach
    public void setup() {
        // Mock data for testing
        mockEmployees = Arrays.asList(
                new Employee(01, "John Doe", "Developer", 50000.0),
                new Employee(02, "Jane Smith", "Manager", 60000.0));
    }

    @Test
    public void testSave() throws Exception {
        // Mock MultipartFile
        MockMultipartFile file = new MockMultipartFile(
                "csvFile", "employees.csv", "text/csv",
                "John Doe,Developer,50000.0\nJane Smith,Manager,60000.0".getBytes());

        // Mock CSVHelper behavior
        when(restTemplate.exchange(anyString(), eq(HttpMethod.GET), any(), eq(byte[].class)))
                .thenReturn(new ResponseEntity<>("John Doe,Developer,50000.0\nJane Smith,Manager,60000.0".getBytes(),
                        HttpStatus.OK));

        // Mock repository behavior
        when(employeeRepository.saveAll(anyList())).thenReturn(mockEmployees);

        // Test the save method
        csvService.save(file);

        // Verify that the saveAll method was called with the correct arguments
        verify(employeeRepository, times(1)).saveAll(anyList());
    }

    @Test
    public void testLoad() {
        // Mock repository behavior
        when(employeeRepository.findAll()).thenReturn(mockEmployees);

        // Test the load method
        ByteArrayInputStream result = csvService.load();

        // Verify that the result matches the expected CSV content
        assertEquals("John Doe,Developer,50000.0\nJane Smith,Manager,60000.0",
                new String(result.readAllBytes()));
    }

    @Test
    public void testCalculateAverageSalaryByJob() {
        // Mock repository behavior
        when(employeeRepository.findAll()).thenReturn(mockEmployees);

        // Test the calculateAverageSalaryByJob method
        Map<String, Double> result = csvService.calculateAverageSalaryByJob();

        // Verify the expected average salaries
        assertEquals(50000.0, result.get("Developer"));
        assertEquals(60000.0, result.get("Manager"));
    }
}
