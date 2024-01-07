package ma.dnaengineering.backend.service;

import ma.dnaengineering.backend.Dto.JobSalaryDto;
import ma.dnaengineering.backend.entity.Employee;
import ma.dnaengineering.backend.repository.EmployeeRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;

import java.io.IOException;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class EmployeeServiceTest {

    @Mock
    private EmployeeRepository employeeRepository;

    @InjectMocks
    private EmployeeService employeeService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void uploadEmployees() throws IOException {
        // Mocking the parseCsv method to return a set of employees
        when(employeeService.parseCsv(any())).thenReturn(
                new HashSet<>(Arrays.asList(
                        new Employee(1L, "John Doe", "Developer", 50000.0),
                        new Employee(2L, "Jane Doe", "Manager", 60000.0)
                ))
        );

        // Mocking the repository saveAll method
        when(employeeRepository.saveAll(anySet())).thenReturn(null);

        // Creating a mock MultipartFile
        MockMultipartFile file = new MockMultipartFile("file", "employees.csv", MediaType.TEXT_PLAIN_VALUE, "CSV content".getBytes());

        // Performing the service method
        Integer result = employeeService.uploadEmployees(file);

        // Verifying that the repository saveAll method was called
        verify(employeeRepository, times(1)).saveAll(anySet());

        // Asserting the result
        assertEquals(2, result);
    }

    @Test
    void getAverageSalaryByJobTitle() {
        // Mocking the repository findAverageSalaryByJobTitle method
        when(employeeRepository.findAverageSalaryByJobTitle()).thenReturn(
                Arrays.asList(new JobSalaryDto("Developer", 55000.0),
                        new JobSalaryDto("Manager", 60000.0))
        );

        // Performing the service method
        List<JobSalaryDto> result = employeeService.getAverageSalaryByJobTitle();

        // Verifying that the repository findAverageSalaryByJobTitle method was called
        verify(employeeRepository, times(1)).findAverageSalaryByJobTitle();

        // Asserting the result
        assertEquals(2, result.size());
        assertEquals("Developer", result.get(0).getJobTitle());
        assertEquals(55000.0, result.get(0).getAverageSalary());
        assertEquals("Manager", result.get(1).getJobTitle());
        assertEquals(60000.0, result.get(1).getAverageSalary());
    }
}
