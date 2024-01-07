package ma.dnaengineering.backend;

import ma.dnaengineering.backend.Entities.Employee;
import ma.dnaengineering.backend.Repositories.CSVRepository;
import ma.dnaengineering.backend.Services.CSVService;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@SpringBootTest
public class CSVServiceTest {

    @Mock
    private CSVRepository csvRepository;

    @InjectMocks
    private CSVService csvService;

    @Test
    public void testParseCsv() throws IOException {
        MultipartFile file = createMockMultipartFile();
        List<Employee> employees = csvService.parseCsv(file);
        assertEquals(2, employees.size());
    }

    @Test
    public void testCalculateAverageSalaryByJobTitle() {
        List<Employee> employees = createSampleEmployeeList();
        Map<String, Double> averageSalaries = csvService.calculateAverageSalaryByJobTitle(employees);
        assertEquals(2, averageSalaries.size());
    }

    @Test
    public void testSave() {
        List<Employee> employees = createSampleEmployeeList();
        csvService.save(employees);
        verify(csvRepository, times(1)).saveAll(employees);
    }

    private MultipartFile createMockMultipartFile() throws IOException {
        InputStream inputStream = getClass().getResourceAsStream("/test.csv");
        return new MockMultipartFile("test.csv", "test.csv", "text/csv", inputStream);
    }

    private List<Employee> createSampleEmployeeList() {
        Employee employee1 = new Employee(1L, "John", "Developer", 60000.0);
        Employee employee2 = new Employee(2L, "Jane", "Tester", 55000.0);
        return Arrays.asList(employee1, employee2);
    }
}
