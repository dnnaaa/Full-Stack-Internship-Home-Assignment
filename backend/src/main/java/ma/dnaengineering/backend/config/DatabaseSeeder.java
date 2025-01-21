package ma.dnaengineering.backend.config;


import jakarta.annotation.PostConstruct;
import ma.dnaengineering.backend.model.Job;
import ma.dnaengineering.backend.repository.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Arrays;

@Component
public class DatabaseSeeder {

    @Autowired
    private JobRepository jobRepository;

    @PostConstruct
    public void seedDatabase() {
        // Check if the database already has data to avoid duplication
        if (jobRepository.count() == 0) {
            Job job1 = new Job(null, "Software Engineer", "Develop software solutions", "New York",
                    BigDecimal.valueOf(80000), LocalDateTime.now(), null);
            Job job2 = new Job(null, "Data Scientist", "Analyze data trends", "San Francisco",
                    BigDecimal.valueOf(95000), LocalDateTime.now(), null);
            Job job3 = new Job(null, "Product Manager", "Manage product lifecycle", "Seattle",
                    BigDecimal.valueOf(120000), LocalDateTime.now(), null);
            Job job4 = new Job(null, "HR Specialist", "Handle recruitment and employee relations", "Boston",
                    BigDecimal.valueOf(60000), LocalDateTime.now(), null);
            Job job5 = new Job(null, "Scrum Master", "Handle the Scrum methodelogy and its relations", "Marrakech",
                    BigDecimal.valueOf(70000), LocalDateTime.now(), null);

            jobRepository.saveAll(Arrays.asList(job1, job2, job3, job4,job5));
            System.out.println("Database seeded with sample jobs.");
        } else {
            System.out.println("Database already contains data. No seeding performed.");
        }
    }
}
