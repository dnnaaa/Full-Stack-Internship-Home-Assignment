package ma.dnaengineering.backend;

import ma.dnaengineering.backend.dto.EmployeeDTO;
import ma.dnaengineering.backend.dto.EmployeesAverageDTO;
import ma.dnaengineering.backend.dto.JobSalaryDto;
import ma.dnaengineering.backend.exception.FileAlreadyExist;
import ma.dnaengineering.backend.exception.FileNotFound;
import ma.dnaengineering.backend.exception.FileTypeCsv;
import ma.dnaengineering.backend.service.CsvService;
import ma.dnaengineering.backend.utils.CsvDataProcess;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Path;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@SpringBootTest
public class CsvServiceTest {

    @Autowired
    private CsvService csvService;

    @MockBean
    private CsvDataProcess csvDataProcess;

    private final String testFileName = "test-employees.csv";

    public CsvServiceTest() {
    }

    @BeforeEach
    public void setup() throws IOException, FileTypeCsv, FileAlreadyExist, FileNotFound {
        String csvContent = """
                id,employee_name,job_title,salary
                1,Jon Ball,Mobile App Developer,7348.0
                """;
        MultipartFile multipartFile = new MockMultipartFile(testFileName, testFileName, "text/csv", csvContent.getBytes());
        csvService.saveFile(multipartFile);
    }

    @Test
    void should_save_File_ifNotExist() throws FileAlreadyExist, FileNotFound, IOException, FileTypeCsv {
        MultipartFile file = new MockMultipartFile("myFileTest.csv", "myFileTest.csv", "text/csv", "content".getBytes());
        String fileName = csvService.saveFile(file);

        assertEquals("myFileTest.csv", fileName);
    }
    @Test
    void should_Not_save_File_ifExist() throws FileAlreadyExist, FileNotFound, IOException, FileTypeCsv {
        MultipartFile file = new MockMultipartFile("employees.csv", "employees.csv", "text/csv", "content".getBytes());
        String fileName = csvService.saveFile(file);

        assertEquals("employees.csv", fileName);
    }

    @Test
    void should_Accept_Only_CsvFile() throws FileAlreadyExist, FileNotFound, IOException, FileTypeCsv {
        MultipartFile file = new MockMultipartFile("myFile.pdf", "myFile", "application/pdf", "content".getBytes());
        assertThrows(FileTypeCsv.class, () -> csvService.saveFile(file) );
    }

    @Test
    void should_read_parsed_csv_file_and_calculate_AvgSalary() throws FileNotFound, IOException {
        when(csvDataProcess.parseCsvFile(testFileName)).thenReturn(createMockEmployeeList());
        EmployeesAverageDTO result = csvService.parsedCsvFile(testFileName);
        assertEquals("1", result.getEmployeeDTOS().get(0).getId());
    }

    @Test
    void should_calculate_job_salary() throws IOException {

        List<JobSalaryDto> result = csvService.getSalaryForJob(createMockEmployeeList());
        assertEquals(7348.0, result.get(1).getSalary());
    }
    private List<EmployeeDTO> createMockEmployeeList() {
        return Arrays.asList(
                new EmployeeDTO("1", "Jon Ball", "Mobile App Developer", "7348.0"),
                new EmployeeDTO("2", "Denise Nelson", "IT Consultant", "10237.0")
                );
    }

}
