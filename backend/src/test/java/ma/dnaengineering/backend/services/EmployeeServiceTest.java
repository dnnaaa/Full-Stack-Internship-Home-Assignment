package ma.dnaengineering.backend.services;

import ma.dnaengineering.backend.dtos.EmployeeDto;


import ma.dnaengineering.backend.dtos.JobSummaryDto;
import ma.dnaengineering.backend.dtos.ResponseDto;
import ma.dnaengineering.backend.exceptions.NoDataFoundException;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;

import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mock.web.MockMultipartFile;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
class EmployeeServiceTest {

    @InjectMocks
    private EmployeeServiceImpl employeeServiceImpl;
    @Test
    public void testProcessCSV() throws IOException, NoDataFoundException {
        ResponseDto expectedResponse = new ResponseDto();
        expectedResponse.getEmployeeDtos().addAll(Arrays.asList(
                new EmployeeDto(1, "Abdelkabir", "Developer", 50000),
                new EmployeeDto(2, "Youssef", "Developer", 60000)
        ));
        expectedResponse.getJobSummaryDtos().addAll(Arrays.asList(
                new JobSummaryDto("Developer", 55000.0)
        ));

        MockMultipartFile file = new MockMultipartFile("file", "test.csv", "text/plain",
                "id,employeeName,jobTitle,salary\n1,Abdelkabir,Developer,50000\n2,Youssef,Developer,60000".getBytes());

        ResponseDto result = employeeServiceImpl.processCSV(file);

        List<EmployeeDto> expectedEmployees = expectedResponse.getEmployeeDtos();
        List<EmployeeDto> actualEmployees = result.getEmployeeDtos();
        assertIterableEquals(expectedResponse.getEmployeeDtos(), result.getEmployeeDtos());

        List<JobSummaryDto> expectedJobSummaries = expectedResponse.getJobSummaryDtos();
        List<JobSummaryDto> actualJobSummaries = result.getJobSummaryDtos();
        assertIterableEquals(expectedResponse.getJobSummaryDtos(), result.getJobSummaryDtos());

        assertEquals(expectedResponse, result);

    }
    @Test
    void processCSV_EmptyFile_ShouldThrowNoDataFoundException() throws IOException {
        MockMultipartFile emptyFile = new MockMultipartFile("file", "empty.csv", "text/csv", new byte[0]);
        assertThrows(NoDataFoundException.class, () -> employeeServiceImpl.processCSV(emptyFile));
    }
    @Test
    public void testReadFile() throws IOException {
        byte[] fileData = "id,employeeName,jobTite,salary\n1,abdelkabir,Java Developer,50000\n2,Youssef,React Developer,60000\n3,Farah,Laravel Developer,60000".getBytes();
        List<EmployeeDto> result = employeeServiceImpl.readFile(fileData);
        assertEquals(3, result.size());

        assertEquals(Integer.valueOf(1), result.get(0).getId());
        assertEquals("abdelkabir", result.get(0).getEmployeeName());
        assertEquals("Java Developer", result.get(0).getJobTitle());
        assertEquals(50000.0, result.get(0).getSalary(), 0.01);

        assertEquals(Integer.valueOf(2), result.get(1).getId());
        assertEquals("Youssef", result.get(1).getEmployeeName());
        assertEquals("React Developer", result.get(1).getJobTitle());
        assertEquals(60000.0, result.get(1).getSalary(), 0.01);
    }
    @Test
    public void testCalculateAverageSalary() {
        List<EmployeeDto> employees = Arrays.asList(
                new EmployeeDto(1, "Abdelkabir", "Developer", 50000),
                new EmployeeDto(2, "Youssef", "Developer", 60000),
                new EmployeeDto(3, "Farah", "Manager", 70000)
        );

        List<JobSummaryDto> result = employeeServiceImpl.calculateAverageSalary(employees);
        assertEquals(2, result.size());
        assertEquals("Developer", result.get(0).getJobTitle());
        assertEquals(55000.0, result.get(0).getAverageSalary(), 0.01);
        assertEquals("Manager", result.get(1).getJobTitle());
        assertEquals(70000.0, result.get(1).getAverageSalary(), 0.01);
    }
}
