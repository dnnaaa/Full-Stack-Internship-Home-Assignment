package ma.dnaengineering.backend.service.impl;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.MockitoAnnotations;
import org.springframework.mock.web.MockMultipartFile;

import ma.dnaengineering.backend.entitys.Employee;
import ma.dnaengineering.backend.services.impl.FileServiceImpl;

class FileServiceImplTest {

	@InjectMocks
	private FileServiceImpl fileService;

	@BeforeEach
	void setUp() {
		MockitoAnnotations.initMocks(this);
	}

	@Test
	void testReadFile() throws IOException {
		String csvContent = "id,name,jobTitle,salary\n1,John Doe,Developer,70000.0\n2,Jane Doe,Manager,80000.0";
		MockMultipartFile file = new MockMultipartFile("file", "employees.csv", "text/csv", csvContent.getBytes());

		List<Employee> employees = fileService.readFile(file);

		assertEquals(2, employees.size());
		assertEquals("John Doe", employees.get(0).getName());
		assertEquals("Jane Doe", employees.get(1).getName());
	}

	@Test
	void testCalculateAverageSalaryByJobTitle() {
		// Prepare a list of employees for testing
		List<Employee> employees = List.of(new Employee(1L, "John Doe", "Developer", 70000.0),
				new Employee(2L, "Jane Doe", "Manager", 80000.0));

		// Call the method under test
		Map<String, Double> averages = fileService.calculateAverageSalaryByJobTitle(employees);

		// Assertions on the result
		assertEquals(2, averages.size());
		assertEquals(70000.0, averages.get("Developer"));
		assertEquals(80000.0, averages.get("Manager"));
	}
}
