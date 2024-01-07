package ma.dnaengineering.backend;

import ma.dnaengineering.backend.entity.CSVData;
import ma.dnaengineering.backend.entity.Employee;
import ma.dnaengineering.backend.service.DocumentService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Map;

public class DocumentServiceTest{

    private DocumentService documentService;

    @BeforeEach
    public void setUp() {
        documentService = new DocumentService();
    }

    @Test
    public void testParseCSVFile() throws Exception {
        String csvData = "Name,Job Title,Salary\n" +
                "Ahmed Naoui,Developer,50000\n" +
                "Jihane Saadi,Manager,80000\n" +
                "Alex Lalle,Manager,60000\n" +
                "Youssef Liaoui,Developer,75000\n";
        MultipartFile multipartFile = new MockMultipartFile("employees.csv", csvData.getBytes(StandardCharsets.UTF_8));

        CSVData result = documentService.parseCSVFile(multipartFile);

        Map<String, List<Employee>> employeesByJobTitle = result.getEmployeesByJobTitle();
        Assertions.assertEquals(2, employeesByJobTitle.size());

        List<Employee> developer = employeesByJobTitle.get("Developer");
        Assertions.assertEquals(2, developer.size());
        Assertions.assertEquals("Ahmed Naoui", developer.get(0).getName());
        Assertions.assertEquals(50000, developer.get(0).getSalary());

        List<Employee> managers = employeesByJobTitle.get("Manager");
        Assertions.assertEquals(2, managers.size());
        Assertions.assertEquals("Jihane Saadi", managers.get(0).getName());
        Assertions.assertEquals(80000, managers.get(0).getSalary());
    }
}
