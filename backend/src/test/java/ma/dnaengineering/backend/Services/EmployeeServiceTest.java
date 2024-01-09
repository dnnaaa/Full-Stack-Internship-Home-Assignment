package ma.dnaengineering.backend.Services;

import ma.dnaengineering.backend.Models.Employee;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

class EmployeeServiceTest {

    @InjectMocks
    private EmployeeService employeeService;

    public EmployeeServiceTest() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    void testProcessCSV_WithValidCSV() throws IOException {
        ClassPathResource resource = new ClassPathResource("test-employees.csv");
        InputStream inputStream = resource.getInputStream();
        MultipartFile multipartFile = new MockMultipartFile("file", "test-employees.csv", "text/csv", inputStream);

        List<Employee> employees = employeeService.readEmployeesFromCSV(multipartFile);
        Map<String, Double> jobTitleAvg = employeeService.calculateAverageSalaryByJobTitle(employees);

        assertEquals(10, employees.size());

        // adding delta because some result have large number ofter the Dots (9529.333333333333)
        assertEquals(9529.33, jobTitleAvg.get("DevOps Engineer"), 0.01);
        assertEquals(3691.75, jobTitleAvg.get("UX/UI Designer"), 0.01);
        assertEquals(11132.33, jobTitleAvg.get("IT Consultant"), 0.01);
    }

}