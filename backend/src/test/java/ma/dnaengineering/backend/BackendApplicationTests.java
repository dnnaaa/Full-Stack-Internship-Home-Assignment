package ma.dnaengineering.backend;

import ma.dnaengineering.backend.Models.Employee;
import ma.dnaengineering.backend.Services.CsvService;
import ma.dnaengineering.backend.Utils.FileReader;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.core.io.Resource;
import static org.junit.jupiter.api.Assertions.assertEquals;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.List;

@SpringBootTest
class BackendApplicationTests {
	@Value("classpath:test.csv")
	private Resource testFile;

	@Autowired
	CsvService<Employee> csv_service ;

	@Test
	void contextLoads() {
	}

	@Test
	void testReadFile() throws IOException {
		List<String> lines = FileReader.readFileByLine(testFile.getFile().getPath());
		List<String> expected = List.of("id,employee_name,job_title,salary",
				"1,Jon Ball,Mobile App Developer,7348.0",
				"2,Denise Nelson,IT Consultant,10237.0");

         assertEquals(expected,lines);
	}

	@Test
     void testServiceProcessMethodLocalFile() throws IOException {
        List<Employee> employees = csv_service.processLocalFile(testFile.getFile().getPath());
		List<Employee> expected = List.of(
				new Employee(1,"Jon Ball","Mobile App Developer",7348.0),
				new Employee(2,"Denise Nelson","IT Consultant",10237.0)
		);

		assertEquals(expected,employees);
	}

	@Test
	void testServiceProcessMethod() throws IOException {
		InputStream inputStream = (testFile.getInputStream());
		List<Employee> employees = csv_service.processUploadedFile(inputStream);
		List<Employee> expected = List.of(
				new Employee(1,"Jon Ball","Mobile App Developer",7348.0),
				new Employee(2,"Denise Nelson","IT Consultant",10237.0)
		);

		assertEquals(expected,employees);
	}

	@Test
	void testServiceAverageSalaryForEachJobTitle() throws IOException {
		InputStream inputStream = (testFile.getInputStream());
		List<Employee> employees = csv_service.processUploadedFile(inputStream);

		assertEquals(2 , employees.size());

		HashMap<String , Double > summary = csv_service.averageSalaryForEachJobTitle(employees);

		assertEquals(7348.0,summary.get("Mobile App Developer"));
		assertEquals(10237.0,summary.get("IT Consultant"));

	}

}
