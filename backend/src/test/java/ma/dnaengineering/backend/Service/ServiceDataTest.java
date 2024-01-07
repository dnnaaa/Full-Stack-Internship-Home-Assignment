package ma.dnaengineering.backend.Service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.List;

import ma.dnaengineering.backend.Model.Employee;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.context.junit.jupiter.SpringExtension;

@SpringBootTest
@ExtendWith(SpringExtension.class)
class ServiceDataTest {
    @Autowired
    private ServiceData serviceData;

    @Test
    void testProcessCsv() throws IOException {
        serviceData.processCsv(new MockMultipartFile("Name", new ByteArrayInputStream("AXAXAXAX".getBytes("UTF-8"))));
        assertTrue(serviceData.getAllEmployees().isEmpty());
    }

    @Test
    void testGetJobTitleSummary() {
        assertTrue(serviceData.getJobTitleSummary().isEmpty());
    }

    @Test
    void testConstructor() {
        ServiceData actualServiceData = new ServiceData();
        List<Employee> allEmployees = actualServiceData.getAllEmployees();
        assertTrue(allEmployees.isEmpty());

        List<String> jobTitleSummary = actualServiceData.getJobTitleSummary();
        assertTrue(jobTitleSummary.isEmpty());

        assertEquals(allEmployees, jobTitleSummary);
    }
}

