package ma.dnaengineering.backend.service;

import ma.dnaengineering.backend.model.Employee;
import org.junit.jupiter.api.Test;
import org.springframework.mock.web.MockMultipartFile;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

class CsvServiceTest {

    @Test
    void parseCSV() throws IOException {
        CsvService csvService = new CsvService();

        String content = "id,employee_name,job_title,salary\n1,John,Developer,80000";
        MockMultipartFile file = new MockMultipartFile("file", "test.csv", "text/csv", content.getBytes(StandardCharsets.UTF_8));

        Map<String, Object> result = csvService.parseCSV(file);

        // Expected Employee Data
        List<Employee> expectedEmployees = Arrays.asList(
                new Employee(1L, "John", "Developer", 80000.0)
        );

        // Expected Average Salaries
        Map<String, String> expectedAverageSalaries = Map.of("Developer", "80000.0");

        // Assertions
        assertEquals(expectedEmployees, result.get("employees"));
        assertEquals(expectedAverageSalaries.size(), ((Map<?, ?>) result.get("averageSalaries")).size());
        assertTrue(expectedAverageSalaries.keySet().containsAll(((Map<?, ?>) result.get("averageSalaries")).keySet()));
        assertTrue(expectedAverageSalaries.values().stream().allMatch(value ->
                ((Map<?, ?>) result.get("averageSalaries")).values().stream().anyMatch(actualValue ->
                        Double.parseDouble(value) == Double.parseDouble(actualValue.toString())
                )
        ));
    }

    @Test
    void calculateAverageSalaries() {
        CsvService csvService = new CsvService();

        // Sample Employees
        List<Employee> employees = Arrays.asList(
                new Employee(1L, "John", "Developer", 80000.0),
                new Employee(2L, "Alice", "Designer", 70000.0),
                new Employee(3L, "Bob", "Developer", 90000.0)
        );

        // Expected Average Salaries
        Map<String, String> expectedAverageSalaries = Map.of(
                "Developer", "85000.0", // (80000 + 90000) / 2
                "Designer", "70000.0"   // Only one Designer
        );

        // Actual Result
        Map<String, String> result = csvService.calculateAverageSalaries(employees);

        // Assertions
        assertEquals(expectedAverageSalaries.size(), result.size());
        assertTrue(expectedAverageSalaries.keySet().containsAll(result.keySet()));
        assertTrue(expectedAverageSalaries.values().stream().allMatch(value ->
                result.values().stream().anyMatch(actualValue ->
                        Double.parseDouble(value) == Double.parseDouble(actualValue.toString())
                )
        ));
    }
}
