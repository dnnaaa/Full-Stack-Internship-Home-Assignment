package ma.dnaengineering.backend;

import com.fasterxml.jackson.databind.ObjectMapper;
import ma.dnaengineering.backend.dto.EmployeeDTO;
import ma.dnaengineering.backend.dto.EmployeesAverageDTO;
import ma.dnaengineering.backend.dto.JobSalaryDto;
import ma.dnaengineering.backend.exception.FileAlreadyExist;
import ma.dnaengineering.backend.exception.FileNotFound;
import ma.dnaengineering.backend.exception.FileTypeCsv;
import ma.dnaengineering.backend.service.CsvService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;

import static org.hamcrest.CoreMatchers.is;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
@SpringBootTest
@AutoConfigureMockMvc
public class CsvControllerTest {


    @MockBean
    private CsvService csvService;

    @Autowired
    private MockMvc mockMvc;

    private String testFileName="myFile.csv";
    private File file;
    @BeforeEach
    public void setup() throws IOException, FileTypeCsv, FileAlreadyExist, FileNotFound {
        String csvContent = """
                id,employee_name,job_title,salary
                1,Jon Ball,Mobile App Developer,7348.0
                2,Denise Nelson,IT Consultant,10237.0
                3,Amanda Harris,Full Stack Developer,6632.0
                4,Danielle Moore,DevOps Engineer,13843.0
                5,Lindsey Young,Project Manager (IT),1499.0
                """;
        MultipartFile multipartFile = new MockMultipartFile(testFileName, testFileName, "text/csv", csvContent.getBytes());
        csvService.saveFile(multipartFile);
    }

    @Test
    public void testGetCsvParsedFile() throws Exception {
        String fileName = "employees.csv";
        EmployeesAverageDTO expectedDto = EmployeesAverageDTO.builder().employeeDTOS(createMockEmployeeList()).jobSalaryDtos(null).build();
        when(csvService.parsedCsvFile(fileName)).thenReturn(expectedDto);
        mockMvc.perform(MockMvcRequestBuilders.get("/csv/{fileName}",fileName)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.employeeDTOS[1].job_title",is("IT Consultant")))
                .andExpect(jsonPath("$.employeeDTOS[0].id", is("1")));
    }

    @Test
    void should_save_file() throws Exception {
        MockMultipartFile file = new MockMultipartFile("file", "test.csv", "text/csv", "id,employee_name,job_title,salary\n1,Jon Ball,Mobile App Developer,7348.0\n".getBytes());
        when(csvService.saveFile(file)).thenReturn("test.csv");

        mockMvc.perform(MockMvcRequestBuilders.multipart("/csv")
                        .file(file)
                        .contentType(MediaType.MULTIPART_FORM_DATA))
                .andExpect(status().isOk())
                .andExpect(content().string("test.csv"));
    }


    private List<EmployeeDTO> createMockEmployeeList() {
        return Arrays.asList(
                new EmployeeDTO("1", "Jon Ball", "Mobile App Developer", "7348.0"),
                new EmployeeDTO("2", "Denise Nelson", "IT Consultant", "10237.0")
        );
    }
}
