package ma.dnaengineering.backend;

import ma.dnaengineering.backend.entities.Employee;
import ma.dnaengineering.backend.parser.CSVParser;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mock.web.MockMultipartFile;


import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
@SpringBootTest
class CsvParserTest {

    @Mock
    private CSVParser csvParser;


    @Test
    public void testParse() {
        String csvContent = "1,Ouassima,Software Enginner,50000.0\n2,Mohamed,Project Manager,60000.0";
        MockMultipartFile mockFile = new MockMultipartFile("file.csv", csvContent.getBytes());

        when(csvParser.readCsvData(mockFile)).thenReturn(List.of(
                new String[]{"1", "Ouassima", "Software Enginner", "50000.0"},
                new String[]{"2", "Mohamed", "Project Manager", "60000.0"}
        ));

        List<Employee> employees = csvParser.parse(mockFile);

        assertEquals(2, employees.size());

        Employee employee1 = employees.get(0);
        assertEquals(1, employee1.getId());
        assertEquals("Ouassima", employee1.getName());
        assertEquals("Software Enginner", employee1.getJobTitle());
        assertEquals(50000.0, employee1.getSalary());

        Employee employee2 = employees.get(1);
        assertEquals(2, employee2.getId());
        assertEquals("Mohamed", employee2.getName());
        assertEquals("Project Manager", employee2.getJobTitle());
        assertEquals(60000.0, employee2.getSalary());
    }

    @Test
    void testReadCsvData() throws IOException {

        String csvContent = "1,Ouassima,Software Enginner,50000.0\n2,Mohamed,Project Manager,60000.0";

        MockMultipartFile file = new MockMultipartFile("file.csv", "file.csv", "text/csv", csvContent.getBytes());

        List<String[]> csvData = csvParser.readCsvData(file);

        assertEquals(2, csvData.size());
        assertEquals("Software Enginner", csvData.get(0)[2]);
        assertEquals("2", csvData.get(1)[0]);
    }

    @Test
    void testCalculateAverageSalary() {

        List<Employee> employees = Arrays.asList(
                new Employee(1L, "Ouassima", "Developer", 50000.0),
                new Employee(2L, "Mohamed", "Manager", 60000.0),
                new Employee(3L, "Jinan", "Developer", 55000.0),
                new Employee(4L, "Oualid", "Manager", 70000.0)
        );


        Map<String, Double> averageSalaries = csvParser.calculateAverageSalary(employees);

        assertEquals(2, averageSalaries.size());
        assertEquals(52500.0, averageSalaries.get("Developer"));
        assertEquals(65000.0, averageSalaries.get("Manager"));
    }
}
