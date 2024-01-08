package ma.dnaengineering.backend;

import com.opencsv.exceptions.CsvValidationException;
import ma.dnaengineering.backend.models.Employee;
import ma.dnaengineering.backend.models.Job;
import ma.dnaengineering.backend.services.EmployeeServices;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@SpringBootApplication
public class BackendApplication  {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

}
