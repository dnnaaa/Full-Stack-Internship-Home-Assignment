package ma.dnaengineering.backend;

import ma.dnaengineering.backend.helper.CSVHelper;
import ma.dnaengineering.backend.model.Employee;
import ma.dnaengineering.backend.repository.EmployeeRepository;
import ma.dnaengineering.backend.service.CSVService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class CSVServiceTest {

    @InjectMocks
    private CSVService csvService;

    @Mock
    private EmployeeRepository employeeRepository;

    @Mock
    private MultipartFile multipartFile;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testSave() throws IOException {
        // Given
        InputStream inputStream = new ByteArrayInputStream("1,John,Doe,50000\n2,Jane,Smith,60000".getBytes());
        when(multipartFile.getInputStream()).thenReturn(inputStream);

        // When
        csvService.save(multipartFile);

        // Then
        verify(employeeRepository, times(1)).saveAll(any());
    }

    @Test
    void testLoad() {
        // Given
        Employee employee1 = new Employee(1L, "John", "Developer", 50000.0);
        Employee employee2 = new Employee(2L, "Jane", "Manager", 60000.0);
        List<Employee> employees = Arrays.asList(employee1, employee2);
        when(employeeRepository.findAll()).thenReturn(employees);

        // When
        csvService.load();

        // Then
        verify(employeeRepository, times(1)).findAll();
    }

    @Test
    void testGetAllEmployees() {
        // Given
        Employee employee1 = new Employee(1L, "John", "Developer", 50000.0);
        Employee employee2 = new Employee(2L, "Jane", "Manager", 60000.0);
        List<Employee> employees = Arrays.asList(employee1, employee2);
        when(employeeRepository.findAll()).thenReturn(employees);

        // When
        List<Employee> result = csvService.getAllEmployees();

        // Then
        assertEquals(2, result.size());
        assertEquals("John", result.get(0).getName());
        assertEquals("Jane", result.get(1).getName());
    }

    @Test
    void testCalculateAverageSalaryByJob() {
        // Given
        Employee employee1 = new Employee(1L, "John", "Developer", 50000.0);
        Employee employee2 = new Employee(2L, "Jane", "Developer", 60000.0);
        Employee employee3 = new Employee(3L, "Bob", "Manager", 70000.0);
        List<Employee> employees = Arrays.asList(employee1, employee2, employee3);
        when(employeeRepository.findAll()).thenReturn(employees);

        // When
        Map<String, Double> result = csvService.calculateAverageSalaryByJob();

        // Then
        assertEquals(2, result.size());
        assertEquals(55000.0, result.get("Developer"));
        assertEquals(70000.0, result.get("Manager"));
    }
}
