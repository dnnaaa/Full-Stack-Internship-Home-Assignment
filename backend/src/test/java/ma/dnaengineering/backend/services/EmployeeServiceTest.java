package ma.dnaengineering.backend.services;

import ma.dnaengineering.backend.dto.SalarySummaryDTO;
import ma.dnaengineering.backend.entities.Employee;
import ma.dnaengineering.backend.repository.EmployeeRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.InputStream;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

import static org.assertj.core.api.AssertionsForInterfaceTypes.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.internal.verification.VerificationModeFactory.times;

@ExtendWith(MockitoExtension.class)
public class EmployeeServiceTest {

    @Mock
    private EmployeeRepository employeeRepository;
    @InjectMocks
    private EmployeeService employeeService;
    @Test
    public void whenParseCSVFile_thenCorrectlySaveEmployees() throws Exception {
        String csvContent = "ID,employeeName,JobTitle,Salary\n1,John Doe,Developer,70000\n2,Jane Doe,Developer,80000";
        InputStream is = new ByteArrayInputStream(csvContent.getBytes());
        MultipartFile mockFile = new MockMultipartFile("file", "test.csv", "text/csv", is);

        employeeService.parseCSVFile(mockFile);

        verify(employeeRepository, times(2)).save(any(Employee.class));
    }
    @Test
    public void whenCalculateAverageSalary_thenCorrectResult() {

        List<Employee> employees = Arrays.asList(
                new Employee(1, "John Doe", "Developer", 70000.0),
                new Employee(2, "Jane Doe", "Developer", 80000.0),
                new Employee(3, "Jim Beam", "Manager", 90000.0)
        );

        Map<String, SalarySummaryDTO> result = employeeService.calculateAverageSalary(employees);

        assertThat(result).hasSize(2);
        assertThat(result.get("Developer").getAverageSalary()).isEqualTo(75000.0);
        assertThat(result.get("Manager").getAverageSalary()).isEqualTo(90000.0);
    }
}
