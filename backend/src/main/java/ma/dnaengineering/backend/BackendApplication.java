package ma.dnaengineering.backend;
import ma.dnaengineering.backend.model.Employee;
import ma.dnaengineering.backend.service.CsvParserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.List;

@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}
	private final String CSV_FILE_PATH = "data/employees.csv";
	@Bean
	public CommandLineRunner run(CsvParserService csvParserService) {
		return args -> {
			String filePath = "data/employees.csv";
			List<Employee> employees = csvParserService.parseCsv(CSV_FILE_PATH);

			// Print employees
			employees.forEach(System.out::println);

			// Calculate and print average salary for each job title
			// You can implement this part in CsvParserService
		};
	}
}
