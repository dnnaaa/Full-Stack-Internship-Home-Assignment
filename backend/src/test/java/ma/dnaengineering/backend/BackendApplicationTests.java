package ma.dnaengineering.backend;

import ma.dnaengineering.backend.service.ICsvService;
import ma.dnaengineering.backend.web.CsvResponse;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import java.io.IOException;
import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
@AutoConfigureMockMvc
class BackendApplicationTests {

	@Test
	void contextLoads() {
	}

	//unit test for service
	@Autowired
	ICsvService csvService;

	@Test
	void getSizeOfDataFromCsvShouldReturnThree() throws IOException {
		MockMultipartFile mockMultipartFile = new MockMultipartFile(
				"file", "test.csv", "text/csv",
				"1,Jon Ball,Mobile App Developer,7348.0\n2,Denise Nelson,IT Consultant,10237.0\n3,Amanda Harris,Full Stack Developer,6632.0".getBytes());

		CsvResponse csvResponse = csvService.getDataFromCsv(mockMultipartFile);

		//assertEquals(4, csvResponse.getEmployeeList().size());
		assertEquals(3, csvResponse.getEmployeeList().size());
		assertEquals(3, csvResponse.getJobSummary().size());
	}

	@Test
	void getNameOfEmployeeFromCsvShouldReturnJon() throws IOException {
		MockMultipartFile mockMultipartFile = new MockMultipartFile(
				"file", "test.csv", "text/csv",
				"1,Jon Ball,Mobile App Developer,7348.0\n2,Denise Nelson,IT Consultant,10237.0\n3,Amanda Harris,Full Stack Developer,6632.0".getBytes());

		CsvResponse csvResponse = csvService.getDataFromCsv(mockMultipartFile);

		assertEquals("Jon Ball", csvResponse.getEmployeeList().get(0).getEmployee_name());
	}


	//unit test for controller
	@Autowired
	private MockMvc mockMvc;

	@Test
	void uploadCsvShouldReturnOk() throws Exception {
		MockMultipartFile mockMultipartFile = new MockMultipartFile(
				"file", "test.csv", "text/csv",
				"1,Jon Ball,Mobile App Developer,7348.0\n2,Denise Nelson,IT Consultant,10237.0\n3,Amanda Harris,Full Stack Developer,6632.0".getBytes());

		mockMvc.perform(MockMvcRequestBuilders.multipart("/api/resources/uploadFile")
						.file(mockMultipartFile)
						.contentType(MediaType.MULTIPART_FORM_DATA))
				.andExpect(MockMvcResultMatchers.status().isOk());
	}

}
