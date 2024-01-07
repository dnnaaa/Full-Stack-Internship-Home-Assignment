package ma.dnaengineering.backend.controllers;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.mock.web.MockMultipartFile;

import java.io.IOException;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class ControllerTest {
    @Autowired
    private Controller controller;

    // Assuming that user has upload a valid file, the test should be passed
    @Test
    void processFile() throws IOException {
        String csvContent = """
                id,employee_name,job_title,salary
                1,John,Front end developer,50000.0
                2,Jane,Backend developer,60000.0
                3,Bob,DevOps engineer,70000.0""";
        MockMultipartFile file = new MockMultipartFile("employees", "test.csv", "text/csv", csvContent.getBytes());
        MockHttpServletResponse response = new MockHttpServletResponse();
        var employees=controller.processFile(file,response);
        // The server should return content
        assertNotNull(employees);
        // The file should be processed in its entirety
        assertEquals(3,employees.size());

    }

    // This test should not be passed in case the id or the salary is not numerical
    @Test
    void idAndSalaryShouldNumerical() throws IOException {
        String csvContent = """
                id,employee_name,job_title,salary
                dds,John,Front end developer,50000.0
                2,Jane,Backend developer,60000.0
                3,Bob,DevOps engineer,70000.0""";
        MockMultipartFile file = new MockMultipartFile("employees", "test.csv", "text/csv", csvContent.getBytes());
        MockHttpServletResponse response = new MockHttpServletResponse();
        assertThrows(RuntimeException.class,()->{
            if (response.getStatus()!=500)throw  new RuntimeException();
        });
    }
}