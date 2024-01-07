package ma.dnaengineering.backend;

import ma.dnaengineering.backend.Controller.EmployeeController;
import ma.dnaengineering.backend.DTO.Employee;
import ma.dnaengineering.backend.DTO.JobSalary;
import ma.dnaengineering.backend.Service.EmployeeServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;

import java.io.IOException;
import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

@SpringBootTest
class BackendApplicationTests {
	@Mock
	private EmployeeServiceImpl csvParserService;

	@InjectMocks
	private EmployeeController employeeController;

	@BeforeEach
	void setUp() {
		MockitoAnnotations.openMocks(this);
	}

	@Test
	void testGetEmployees() throws IOException {
		when(csvParserService.parseCsv(anyString())).thenReturn(Collections.singletonList(new Employee()));
		List<Employee> result = employeeController.getEmployees("employees.csv");
		verify(csvParserService, times(1)).parseCsv(anyString());
		assertEquals(1, result.size());
	}

	@Test
	void testGetAverageSalaryByJobTitle() throws IOException {
		when(csvParserService.parseCsv(anyString())).thenReturn(Collections.singletonList(new Employee()));
		//when(csvParserService.calculateAverageSalaryByJobTitle(anyList())).thenReturn(Collections.singletonMap("JobTitle", 1000.0));
		List<JobSalary> result = employeeController.getAverageSalaryByJobTitle("employees.csv");
		verify(csvParserService, times(1)).parseCsv(anyString());
		verify(csvParserService, times(1)).calculateAverageSalaryByJobTitle(anyList());
		assertEquals(1, result.size());
	}

}