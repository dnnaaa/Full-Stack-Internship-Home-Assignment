package ma.dnaengineering.backend.parser;

import ma.dnaengineering.backend.model.Employee;

import org.junit.jupiter.api.Test;
import org.springframework.mock.web.MockMultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

class CsvParserImplTest {

    private final CsvParser csvParser = new CsvParserImpl();

    @Test
    void parseCsv_ValidInput_ReturnsListOfEmployees() throws IOException {

        InputStream inputStream = getClass().getResourceAsStream("/test-employees.csv");
        MockMultipartFile file = new MockMultipartFile("file", "test-employees.csv", "text/csv", inputStream);


        List<Employee> employees = csvParser.parseCsv(file.getInputStream());


        assertNotNull(employees);
        assertEquals(2, employees.size()); // Assuming your test-employees.csv file has 2 lines excluding the header
    }
}
