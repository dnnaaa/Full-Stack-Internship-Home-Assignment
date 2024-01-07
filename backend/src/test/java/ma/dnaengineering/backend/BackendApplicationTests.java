package ma.dnaengineering.backend;
import ma.dnaengineering.backend.dto.EmployeeDTO;
import ma.dnaengineering.backend.dto.JobSummaryDTO;
import ma.dnaengineering.backend.exceptions.EmployeeDataParsingException;
import ma.dnaengineering.backend.service.EmployeeService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mock.web.MockMultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest
class BackendApplicationTests {

	@Autowired
	private EmployeeService employeeService;

	@Test
	void testParseCSVAndReturnEmployees() throws IOException, EmployeeDataParsingException {
		Resource resource = new ClassPathResource("employees.csv");
		InputStream inputStream = resource.getInputStream();
		MockMultipartFile file = new MockMultipartFile("employees.csv", inputStream);
		List<EmployeeDTO> employees = employeeService.parseCSVAndReturnEmployees(file.getInputStream());
		assertNotNull(employees);
		assertEquals(1000,employees.size());
	}

	@Test
	void testCalculateAverageSalaryPerJobTitle() throws IOException, EmployeeDataParsingException {
		Resource resource = new ClassPathResource("employees.csv");
		InputStream inputStream = resource.getInputStream();
		MockMultipartFile file = new MockMultipartFile("employees.csv", inputStream);
		List<EmployeeDTO> employees = employeeService.parseCSVAndReturnEmployees(file.getInputStream());
		List<JobSummaryDTO> jobSummaries = employeeService.calculateAverageSalaryPerJobTitle(employees);
		assertNotNull(jobSummaries);
		assertEquals(30,jobSummaries.size());
	}
}
