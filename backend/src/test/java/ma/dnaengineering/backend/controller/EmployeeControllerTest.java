package ma.dnaengineering.backend.controller;

import ma.dnaengineering.backend.Dto.JobSalaryDto;
import ma.dnaengineering.backend.entity.Employee;
import ma.dnaengineering.backend.repository.EmployeeRepository;
import ma.dnaengineering.backend.service.EmployeeService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.Arrays;

import static org.mockito.Mockito.*;

class EmployeeControllerTest {

    private MockMvc mockMvc;

    @Mock
    private EmployeeService employeeService;

    @Mock
    private EmployeeRepository employeeRepository;

    @InjectMocks
    private EmployeeController employeeController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        this.mockMvc = MockMvcBuilders.standaloneSetup(employeeController).build();
    }

    @Test
    void uploadEmployees() throws Exception {
        // Mocking the service uploadEmployees method
        when(employeeService.uploadEmployees(any())).thenReturn(5);

        // Creating a mock MultipartFile
        MockMultipartFile file = new MockMultipartFile("file", "employees.csv", MediaType.TEXT_PLAIN_VALUE, "CSV content".getBytes());

        // Performing the request and validating the response
        mockMvc.perform(MockMvcRequestBuilders.multipart("/api/upload").file(file))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().string("5"));

        // Verifying that the service uploadEmployees method was called
        verify(employeeService, times(1)).uploadEmployees(any());
    }

    @Test
    void getEmployees() throws Exception {
        // Mocking the repository findAll method
        when(employeeRepository.findAll()).thenReturn(
                Arrays.asList(new Employee(1L, "John Doe", "Developer", 50000.0),
                        new Employee(2L, "Jane Doe", "Manager", 60000.0))
        );

        // Performing the request and validating the response
        mockMvc.perform(MockMvcRequestBuilders.get("/api/employees"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.size()").value(2));

        // Verifying that the repository findAll method was called
        verify(employeeRepository, times(1)).findAll();
    }

    @Test
    void getAverageSalaryByJobTitle() throws Exception {
        // Mocking the service getAverageSalaryByJobTitle method
        when(employeeService.getAverageSalaryByJobTitle()).thenReturn(
                Arrays.asList(new JobSalaryDto("Developer", 55000.0),
                        new JobSalaryDto("Manager", 60000.0))
        );

        // Performing the request and validating the response
        mockMvc.perform(MockMvcRequestBuilders.get("/api/average-salary-by-job-title"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.size()").value(2));

        // Verifying that the service getAverageSalaryByJobTitle method was called
        verify(employeeService, times(1)).getAverageSalaryByJobTitle();
    }
}
