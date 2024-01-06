package ma.dnaengineering.backend;

import ma.dnaengineering.backend.persistence.Employee;
import ma.dnaengineering.backend.service.CsvParserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.io.IOException;
import java.io.InputStream;
import java.util.Arrays;
import java.util.List;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class BackendApplicationTests {

	@Autowired
	private MockMvc mockMvc;

	@MockBean
	private CsvParserService csvParserService;

	@Autowired
	private ResourceLoader resourceLoader;

	@Test
	void testProcessCsv() throws Exception {

		// Load CSV data from a file named "sample.csv" in the resources directory
		Resource resource = resourceLoader.getResource("classpath:sample.csv");
		MockMultipartFile file = createMockMultipartFile(resource);

		// Test with 2 employees
		List<Employee> employees = Arrays.asList(
				new Employee(1L, "Jon Ball", "Mobile App Developer", 7348.0),
				new Employee(2L, "Denise Nelson", "IT Consultant", 10237.0)
		);

		when(csvParserService.parseCsv(file)).thenReturn(employees);

		// Perform the request and verify the results
		mockMvc.perform(MockMvcRequestBuilders.multipart("/api/csv/process")
						.file(file)
						.contentType(MediaType.MULTIPART_FORM_DATA))
				.andExpect(status().isOk())
				// checking the first employee
				.andExpect(jsonPath("$[0].id").value(1L))
				.andExpect(jsonPath("$[0].employeeName").value("Jon Ball"))
				.andExpect(jsonPath("$[0].jobTitle").value("Mobile App Developer"))
				.andExpect(jsonPath("$[0].salary").value(7348.0))
				// checking the first employee
				.andExpect(jsonPath("$[1].id").value(2L))
				.andExpect(jsonPath("$[1].employeeName").value("Denise Nelson"))
				.andExpect(jsonPath("$[1].jobTitle").value("IT Consultant"))
				.andExpect(jsonPath("$[1].salary").value(10237.0));


	}

	private MockMultipartFile createMockMultipartFile(Resource resource) throws IOException {
		InputStream inputStream = resource.getInputStream();
		byte[] bytes = inputStream.readAllBytes();
		return new MockMultipartFile("file", resource.getFilename(), "text/csv", bytes);
	}
}














