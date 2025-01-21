package ma.dnaengineering.backend;

import ma.dnaengineering.backend.entities.Job;
import ma.dnaengineering.backend.repositories.JobRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.math.BigDecimal;

@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

	@Bean
	CommandLineRunner initData(JobRepository jobRepository) {
		return args -> {
			// Check if data already exists to avoid duplicate inserts
			if (jobRepository.count() == 0) {
				jobRepository.save(new Job(
						null,
						"Software Engineer",
						"Design, develop, and maintain software applications.",
						"New York, USA",
						BigDecimal.valueOf(85000.00),
						null,
						null
				));
				jobRepository.save(new Job(
						null,
						"Data Scientist",
						"Analyze and interpret complex datasets.",
						"London, UK",
						BigDecimal.valueOf(105000.00),
						null,
						null
				));
				jobRepository.save(new Job(
						null,
						"Product Manager",
						"Oversee product development lifecycle.",
						null,
						BigDecimal.valueOf(95000.00),
						null,
						null
				));
				jobRepository.save(new Job(
						null,
						"DevOps Engineer",
						"Automate and streamline software development and infrastructure operations.",
						null,
						BigDecimal.valueOf(90000.00),
						null,
						null
				));
			}
		};
	}

}
