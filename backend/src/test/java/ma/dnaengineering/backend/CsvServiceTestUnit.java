package ma.dnaengineering.backend;

import ma.dnaengineering.backend.Models.Employe;
import ma.dnaengineering.backend.Services.CsvService;
import org.junit.jupiter.api.Test;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class CsvServiceTestUnit {

    @Test
    void parseCsvTest() throws IOException {
        // Arrange
        CsvService csvParserService = new CsvService();
        String filePath = "employees.csv";

        // Act
        List<Employe> employees = csvParserService.parseCsv(filePath);

        // Assert
        assertEquals(2, employees.size());
        assertEquals(1, employees.get(0).getEmployeId());
        assertEquals("John", employees.get(0).getName());
        assertEquals("Full Stack Developer", employees.get(0).getJobTitle());
        assertEquals(50000, employees.get(0).getSalary());

        assertEquals(2, employees.get(1).getEmployeId());
        assertEquals("Jane", employees.get(1).getName());
        assertEquals("Software Developer", employees.get(1).getJobTitle());
        assertEquals(60000, employees.get(1).getSalary());
    }

    @Test
    void calculateAverageSalaryTest() {
        // Arrange
        CsvService csvParserService = new CsvService();
        List<Employe> employees = List.of(
                new Employe(1, "John", "Doe", 50000),
                new Employe(2, "Jane", "Smith", 60000)
        );

        // Act
        Map<String, Double> averageSalaries = csvParserService.calculateAverageSalary(employees);

        // Assert
        assertEquals(2, averageSalaries.size());
        assertEquals(55000, averageSalaries.get("Doe"));
        assertEquals(60000, averageSalaries.get("Smith"));
    }
}
