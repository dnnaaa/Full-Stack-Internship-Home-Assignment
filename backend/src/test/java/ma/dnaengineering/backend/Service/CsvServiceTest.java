package ma.dnaengineering.backend.Service;

import ma.dnaengineering.backend.Model.Employee;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

@ContextConfiguration(classes = {CsvService.class})
@ExtendWith(SpringExtension.class)
class CsvServiceTest {
    @Autowired
    private CsvService csvService;

    @Test
    void testProcessCsv() throws IOException {
        csvService.processCsv(new MockMultipartFile("Name", new ByteArrayInputStream("AXAXAXAX".getBytes("UTF-8"))));
        assertTrue(csvService.getAllEmployees().isEmpty());
    }


    @Test
    void testGetJobTitleSummary() {
        assertTrue(csvService.getJobTitleSummary().isEmpty());
    }


    @Test
    void testConstructor() {
        CsvService actualCsvService = new CsvService();
        List<Employee> allEmployees = actualCsvService.getAllEmployees();
        assertTrue(allEmployees.isEmpty());
        List<String> jobTitleSummary = actualCsvService.getJobTitleSummary();
        assertEquals(allEmployees, jobTitleSummary);
        assertTrue(jobTitleSummary.isEmpty());
    }
}

