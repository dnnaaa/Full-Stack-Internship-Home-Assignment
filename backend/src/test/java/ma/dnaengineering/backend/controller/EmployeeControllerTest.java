package ma.dnaengineering.backend.controller;

import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.multipart;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.springframework.http.MediaType;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import ma.dnaengineering.backend.Entity.Employee;
import ma.dnaengineering.backend.Service.EmployeeServiceImp;

@WebMvcTest(EmployeeController.class)
public class EmployeeControllerTest {
	
	@Autowired
	private MockMvc mockMvc;
	
	@MockBean
	private EmployeeServiceImp employeeService;
	@InjectMocks
    private EmployeeController employeeController;
	
	 @Test
	 public void testFetchEmployeeList() throws Exception {
	        // Mock data for testing
	        Employee employee1 = new Employee(1L, "Jason Johnson", "Developer", 50000.0);
	        Employee employee2 = new Employee(2L, "Kimberly Allen", "Designer", 60000.0);
	        List<Employee> mockEmployeeList = Arrays.asList(employee1, employee2);
	    
	        // Mock the behavior of the employeeService
	        when(employeeService.fetchEmployeeList()).thenReturn(mockEmployeeList);

	        // Perform GET request to /employeeInformation
	        mockMvc.perform(get("/employeeInformation")
	                .contentType(MediaType.APPLICATION_JSON))
	                .andExpect(status().isOk())
	                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
	                .andExpect(jsonPath("$[0].employeeName").value("Jason Johnson"))
	                .andExpect(jsonPath("$[0].employeeJobTitle").value("Developer"))
	                .andExpect(jsonPath("$[0].employeeSalary").value(50000.0))
	                .andExpect(jsonPath("$[1].employeeName").value("Kimberly Allen"))
	                .andExpect(jsonPath("$[1].employeeJobTitle").value("Designer"))
	                .andExpect(jsonPath("$[1].employeeSalary").value(60000.0));

	        verify(employeeService, times(1)).fetchEmployeeList();
	    }
  
	 @Test
	    void testFetchAverage() throws Exception {
	        // Mock data for testing
	        Map<String, Double> mockAverage = Map.of("averageSalary", 55000.0);

	        // Mock the behavior of the employeeService
	        when(employeeService.getAverageSalary()).thenReturn(Arrays.asList(mockAverage));

	        // Perform GET request to /jobsSummary
	        ResultActions resultActions = mockMvc.perform(get("/jobsSummary")
	                .contentType(MediaType.APPLICATION_JSON))
	                .andExpect(status().isOk())
	                .andExpect(content().contentType(MediaType.APPLICATION_JSON));

	        // Assertions for the returned JSON
	        resultActions.andExpect(jsonPath("$[0].averageSalary").value(55000.0));

	        verify(employeeService, times(1)).getAverageSalary();
	    }
}
