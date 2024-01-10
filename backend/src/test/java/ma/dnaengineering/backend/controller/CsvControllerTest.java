package ma.dnaengineering.backend.controller;

import ma.dnaengineering.backend.model.Employee;
import ma.dnaengineering.backend.service.CsvService;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockMultipartFile;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class CsvControllerTest {

    @Test
    void uploadAndProcessCSV_Success() throws IOException {
        CsvService csvService = mock(CsvService.class);
        CsvController csvController = new CsvController(csvService);

        String content = "id,employee_name,job_title,salary\n1,John,Developer,80000";
        MockMultipartFile file = new MockMultipartFile("file", "test.csv", "text/csv", content.getBytes(StandardCharsets.UTF_8));

        List<Employee> expectedEmployees = Arrays.asList(
                new Employee(1L, "John", "Developer", 80000.0)
        );

        Map<String, String> expectedAverageSalaries = new HashMap<>();
        expectedAverageSalaries.put("Developer", "80000.0");

        Map<String, Object> expectedResult = new HashMap<>();
        expectedResult.put("employees", expectedEmployees);
        expectedResult.put("averageSalaries", expectedAverageSalaries);

        when(csvService.parseCSV(file)).thenReturn(expectedResult);

        ResponseEntity<Map<String, Object>> response = csvController.uploadAndProcessCSV(file);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(expectedResult, response.getBody());
    }

    @Test
    void uploadAndProcessCSV_Failure() throws IOException {
        CsvService csvService = mock(CsvService.class);
        CsvController csvController = new CsvController(csvService);

        MockMultipartFile file = new MockMultipartFile("file", "test.csv", "text/csv", "Invalid CSV Content".getBytes(StandardCharsets.UTF_8));

        when(csvService.parseCSV(file)).thenThrow(new IOException("Invalid CSV format"));

        ResponseEntity<Map<String, Object>> response = csvController.uploadAndProcessCSV(file);

        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
    }
}
