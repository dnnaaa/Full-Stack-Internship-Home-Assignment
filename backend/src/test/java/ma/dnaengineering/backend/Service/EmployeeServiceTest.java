package ma.dnaengineering.backend.Service;

import static org.mockito.Mockito.when;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import ma.dnaengineering.backend.Entity.Employee;
import ma.dnaengineering.backend.Repository.EmployeeRepository;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
public class EmployeeServiceTest {
	
	@Autowired
	private EmployeeServiceImp employeeService;
	
	@MockBean
	private EmployeeRepository employeeRepository;
	@Mock
	private InputStream fakeInputStream;
	
	@Test
	public void testCsvToEmployee() {
		
	        // CSV data for testing
	        String csvData = "id,employee_name,job_title,salary \n"
	        		+ "1,Kimberly Allen,IT,50000 \n"
	        		+ "2,Jason Johnson,IT,60000";
	       
	        // Mock the behavior of the injected InputStream
	        try {
	        
	        	InputStream inputStream = new ByteArrayInputStream(csvData.getBytes(StandardCharsets.UTF_8));

	            when(fakeInputStream.read()).thenReturn(0).thenReturn(-1);  // Simulate reading bytes
	            when(fakeInputStream.read(Mockito.any(byte[].class), Mockito.anyInt(), Mockito.anyInt())).thenAnswer(invocation -> {
	                byte[] buffer = invocation.getArgument(0);
	                int offset = invocation.getArgument(1);
	                int length = invocation.getArgument(2);
	                return inputStream.read(buffer, offset, length);
	            });
			        
	            // Call the method to be tested    
	            List<Employee> result = employeeService.csvToEmployee(inputStream);
			    //assertEquals(2, result != null ? result.size() : 0);
			    // Assertions
			        if (result != null && result.size() > 0) {
				        assertEquals(2, result.size());
				        assertEquals("Kimberly Allen", result.get(0).getEmployeeName());
				        assertEquals("IT", result.get(0).getEmployeeJobTitle());
			 	        assertEquals(50000.0, result.get(0).getEmployeeSalary());
				        assertEquals("Jason Johnson", result.get(1).getEmployeeName());
				        assertEquals("IT", result.get(1).getEmployeeJobTitle());
				        assertEquals(60000.0, result.get(1).getEmployeeSalary());
			        }
			} catch (IOException e) {
				
				e.printStackTrace();
			}  
	       
	 
	    }

}
