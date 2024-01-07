package ma.dnaengineering.backend;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class CSVControllerTest {

	@Autowired
	private MockMvc mockMvc;

	@Test
	void uploadCSV_shouldReturnProcessedData() throws Exception {
		// Create a sample CSV file for testing
		String content = "id,employee_name,job_title,salary\n1,John Doe,Developer,50000.0\n2,Jane Smith,Manager,60000.0";
		MockMultipartFile file = new MockMultipartFile("file", "test.csv", MediaType.TEXT_PLAIN_VALUE, content.getBytes());

		mockMvc.perform(MockMvcRequestBuilders.multipart("/upload")
						.file(file))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$[0]").value("Processed successfully"));
	}
}
