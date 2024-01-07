package ma.dnaengineering.backend.services;

import ma.dnaengineering.backend.dto.EmployeeAndAveragesDto;
import ma.dnaengineering.backend.dto.SalaryByJobTitle;
import ma.dnaengineering.backend.model.Employee;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class EmployeeServiceTest {
    EmployeeService employeeService = new EmployeeService();

    @Test
    public void testParseCsvToListOfEmployee() throws IOException {
        // Create a sample CSV file content
        String csvContent = "id,employee_name,job_title,salary\n1,John,Dveloper,50000\n2,Jane,Tester,60000";
        MockMultipartFile file = new MockMultipartFile("file.csv", "file.csv", "text/csv", csvContent.getBytes());

        // Call the method to be tested
        List<Employee> result = employeeService.parseCsvToListOfEmployee(file);

        // Assert the result
        //check the list of employees
        assertEquals(2, result.size());
        //check if the name was parsed
        assertEquals("John", result.get(0).getEmployee_name());
        //check if the job title was parsed
        assertEquals("Tester", result.get(1).getJob_title());
        //check if the salary was parsed
        assertEquals(60000, result.get(1).getSalary());

    }

    @Test
    public void testTheAverageAndEmployeeList() throws IOException {
        // Create a sample CSV file content
        String csvContent = "id,employee_name,job_title,salary\n1,John,Tester,500.00\n2,Jane,Tester,600.00";
        MockMultipartFile file = new MockMultipartFile("file.csv", "file.csv", "text/csv", csvContent.getBytes());

        // Call the method to be tested
        EmployeeAndAveragesDto result = employeeService.uploadEmployeesAndProcess(file);

        // Assert the result
        //find if the list of employees contain two employees
        assertEquals(2, result.getEmployeeList().size());
        //Check if the fillter by job title works
        assertEquals(1, result.getListOfAverages().size());
        //Check if the average is well calculated
        assertEquals((500.0+600.0)/2, result.getListOfAverages().get(0).getAverageSalary());


    }



    @Test
    public void testuploadEmployeesAndProcess() throws IOException {
        // Create a sample CSV file content
        String csvContent = "id,employee_name,job_title,salary\n1,John,Tester,50000\n2,Jane,developper,60000";
        MockMultipartFile file = new MockMultipartFile("file.csv", "file.csv", "text/csv", csvContent.getBytes());

        // Call the method to be tested
        EmployeeAndAveragesDto result = employeeService.uploadEmployeesAndProcess(file);

        // Assert the result
        //find if the list of employees contain two employees
        assertEquals(2, result.getEmployeeList().size());
        //Check if the fillter by job title works
        assertEquals(1, result.getListOfAverages().size());
        //Check if the average is well calculated
        assertEquals((500.0+600.0)/2, result.getListOfAverages().get(0).getAverageSalary());


    }

    @Test
    public void testUploadEmployeesAndProcessNoContent() {
        // Create an empty CSV file
        MockMultipartFile file = new MockMultipartFile("file.csv", "file.csv", "text/csv", new byte[0]);

        // Call the method to be tested and expect an exception
        ResponseStatusException exception = assertThrows(ResponseStatusException.class,
                () -> employeeService.uploadEmployeesAndProcess(file));

        // Assert the exception status and message
        assertEquals(HttpStatus.NO_CONTENT, exception.getStatusCode());
        assertEquals("There is no employees", exception.getReason());
    }


    @Test
    public void testAveregeOfAJobCategorieThatContainOneEmployee() throws IOException {
        // Create a sample CSV file content
        // Create a sample list of employees
        List<Employee> employees = Arrays.asList(
                new Employee(1L, "John", "Developer", 500.00),
                new Employee(2L, "Jane", "Tester", 600.00),
                new Employee(3L, "Bob", "Developer", 7000.0)
        );

        // Call the method to be tested
        List<SalaryByJobTitle> result = employeeService.getJobsByThereAverages(employees);

        // Assert the result
        // check the average list
        assertEquals(2, result.size());
        // check the Job title that contain one employee
        assertEquals("Tester", result.get(0).getJobTitle());
        // check the average of a categorie that contain one employee
        assertEquals(600.00, result.get(0).getAverageSalary());

    }

}