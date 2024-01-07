package ma.dnaengineering.backend;

import com.opencsv.exceptions.CsvException;
import ma.dnaengineering.backend.models.Employe;
import ma.dnaengineering.backend.services.ProcessingFilesService;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
class BackendApplicationTests {
	void CloudArchitectAVG() throws IOException, CsvException {
		ProcessingFilesService processingFilesService = new ProcessingFilesService();
		File file = new File("D:\\full-stack-internship-home-assignment\\data\\employees.csv");
		InputStream inputStream = new FileInputStream(file);
		List<Employe> employees = processingFilesService.getEmployees(inputStream);
		assert processingFilesService.getEmployeesAverageSalary(employees).containsKey("Cloud Architect");
		//one average if it's true
		assertEquals(8149.5,processingFilesService.getEmployeesAverageSalary(employees).get("Cloud Architect"));
		//total number of employees
		assertEquals(1000,employees.size());
		//number of all jobs we have
		assertEquals(30,processingFilesService.getEmployeesAverageSalary(employees).size());
	}
	@Test
	void contextLoads() throws IOException, CsvException {
		this.CloudArchitectAVG();
	}

}
