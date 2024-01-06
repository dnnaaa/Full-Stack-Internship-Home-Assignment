package ma.dnaengineering.backend;

import ma.dnaengineering.backend.controller.CSVController;
import ma.dnaengineering.backend.model.Employee;
import ma.dnaengineering.backend.service.CSVFileParser;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class CSVControllerTest {

    @Mock
    private CSVFileParser fileParser;

    @InjectMocks
    private CSVController csvController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    void uploadCSV_ValidFile_ReturnsListOfEmployees() throws IOException {
        // Mock CSV data
        String csvData = "1,yassine oussi,Engineer,50000\n2,test,Manager,60000\n";
        MultipartFile file = new MockMultipartFile("file", "test.csv", "text/csv", csvData.getBytes());

        // Mock fileParser behavior
        List<Employee> expectedEmployees = new ArrayList<>();
        when(fileParser.parseCSV(csvData)).thenReturn(new ArrayList<>()); // Mock parsed data
        when(fileParser.parseCSV(anyString())).thenReturn(new ArrayList<>()); // Mock parsed data
        when(fileParser.parseCSV(new String(file.getBytes()))).thenReturn(new ArrayList<>()); // Mock parsed data

        List<Employee> result = csvController.uploadCSV(file);

        assertEquals(expectedEmployees.size(), result.size());
        verify(fileParser, times(1)).parseCSV(csvData);
    }

    @Test
    void processCSV_ValidEmployees_ReturnsJobSummary() {
        CSVController csvController = new CSVController();
        List<Employee> employees = List.of(
                new Employee(1L, "yassine oussi", "Engineer", 50000.0),
                new Employee(2L, "test", "Manager", 60000.0)
        );

        Map<String, Object> result = csvController.processCSV(employees);

        assertEquals(2, ((List<?>) result.get("employees")).size());
        assertEquals(2, ((Map<?, ?>) result.get("jobSummary")).size());
    }
}
