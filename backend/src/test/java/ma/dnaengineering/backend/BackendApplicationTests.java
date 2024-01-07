package ma.dnaengineering.backend;

import ma.dnaengineering.backend.controller.EmployeeController;
import ma.dnaengineering.backend.dto.EmployeeDTO;
import ma.dnaengineering.backend.repository.JobSummaryRepository;
import ma.dnaengineering.backend.service.EmployeeService;
import ma.dnaengineering.backend.utils.CSVParser;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.List;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.multipart;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@TestPropertySource(
        locations = "classpath:application-integrationtest.properties")
@WebMvcTest(controllers = EmployeeController.class)
class BackendApplicationTests {

    @Autowired
    private MockMvc mvc;

    @Autowired
    private WebApplicationContext webApplicationContext;

    @MockBean
    JobSummaryRepository jobSummaryRepository;

    @MockBean
    EmployeeService employeeService;

    /**
     * Uploads a CSV file.
     *
     * @throws Exception if an error occurs during the upload process
     */
    @Test
    void testUploadCSV() throws Exception {

        MockMultipartFile file = getFile();

        MockMvc mockMvc
                = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
        mockMvc.perform(multipart("/employees/process").file(file))
                .andExpect(status().isOk());
    }

    /**
     * A description of the entire Java function.
     *
     * @throws Exception description of the exception that can be thrown
     */
    @Test
    void testGetEmployees() throws Exception {

        mvc.perform(MockMvcRequestBuilders.get("/employees?page=1&size=10")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    /**
     * Performs a GET request to retrieve job summaries for employees.
     *
     * @throws Exception if an error occurs during the request
     */
    @Test
    void testGetJobSummaries() throws Exception {

        mvc.perform(MockMvcRequestBuilders.get("/employees/jobsummaries?page=1&size=10")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    /**
     * Test the CSVParser.
     *
     * @throws Exception if an error occurs during the test
     */
    @Test
    void testCSVParser() throws Exception {

        MockMultipartFile file = getFile();

        List<EmployeeDTO> employees = CSVParser.parse(file);

        assertThat(employees).isNotNull();
        assertThat(employees.size()).isEqualTo(1000);

        // Print the table header
        // Print the table header
        System.out.printf("%-5s %-30s %-30s %-10s%n", "ID", "Name", "Job", "Salary");

        // Print each employee row
        for (EmployeeDTO employee : employees) {
            System.out.printf("%-5s %-30s %-30s %-10s%n", employee.getId(), employee.getName(), employee.getJobTitle(), employee.getSalary());
        }

    }


    /**
     * Retrieves a mock multipart file containing employee data.
     *
     * @return a mock multipart file containing employee data
     * @throws IOException if an I/O error occurs
     */
    public MockMultipartFile getFile() throws IOException {

        FileInputStream inputStream = new FileInputStream("C:\\Users\\pauli\\IdeaProjects\\Full-Stack-Internship-Home-Assignment\\data\\employees.csv");

        MockMultipartFile file
                = new MockMultipartFile(
                "file",
                "employees.txt",
                MediaType.TEXT_PLAIN_VALUE,
                inputStream.readAllBytes()
        );
        inputStream.close();

        return file;
    }
}
