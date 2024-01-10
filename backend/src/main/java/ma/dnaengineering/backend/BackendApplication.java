package ma.dnaengineering.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.List;
import java.util.Map;

@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) throws IOException {
		SpringApplication.run(BackendApplication.class, args);
		FileInputStream inputStream = new FileInputStream("data/employees.csv");
		EmployeeParser parser = new EmployeeParser();
		List<Employee> employees = parser.parse(inputStream);

	/*	for (Employee employee : employees) {
			System.out.println(employee);
		}*/
		List<JobSummary> averageSalaryByJobTitle = EmployeeService.getAverageSalaryByJobTitle(employees);

		System.out.println(averageSalaryByJobTitle);
	}

}
