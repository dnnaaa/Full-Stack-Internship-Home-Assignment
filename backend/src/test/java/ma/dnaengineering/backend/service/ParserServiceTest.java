package ma.dnaengineering.backend.service;
import ma.dnaengineering.backend.model.Employee;
import ma.dnaengineering.backend.service.ParserService;
import org.junit.jupiter.api.Test;
import org.springframework.mock.web.MockMultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

class ParserServiceTest {

    private final ParserService parserService = new ParserService();

    @Test
    void uploadAndProcessCsv_ValidInput_ParsesAndStoresData() throws IOException {

        InputStream inputStream = getClass().getResourceAsStream("/test-employees.csv");
        MockMultipartFile file = new MockMultipartFile("file", "test-employees.csv", "text/csv", inputStream);


        parserService.uploadAndProcessCsv(file);
        List<Employee> employees = parserService.getAllEmployees();


        assertNotNull(employees);
        assertEquals(2, employees.size()); // Assuming your test-employees.csv file has 2 lines excluding the header
    }

    @Test
    void calculateAverageSalaries_ValidInput_ReturnsMapWithAverages() throws IOException {
        // Arrange
        InputStream inputStream = getClass().getResourceAsStream("/test-employees.csv");
        MockMultipartFile file = new MockMultipartFile("file", "test-employees.csv", "text/csv", inputStream);

        // Act
        parserService.uploadAndProcessCsv(file);
        Map<String, Double> averageSalaries = parserService.calculateAverageSalaries();

        // Assert
        assertNotNull(averageSalaries);
    }
}
