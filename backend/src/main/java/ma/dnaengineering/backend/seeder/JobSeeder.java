package ma.dnaengineering.backend.seeder;

import lombok.extern.slf4j.Slf4j;
import ma.dnaengineering.backend.dto.JobData;
import ma.dnaengineering.backend.facade.impl.DefaultJobFacade;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Random;

@Component
@Slf4j
public class JobSeeder implements CommandLineRunner {
    private final DefaultJobFacade jobFacade;
    private final Random random = new Random();

    public JobSeeder(DefaultJobFacade jobFacade) {
        this.jobFacade = jobFacade;
    }

    @Override
    public void run(String... args) {
        if (jobFacade.findAll().isEmpty()) {
            for (int i = 1; i <= 100; i++) {
                JobData jobData = JobData.builder()
                        .title("Job Title " + i)
                        .description("Description for job " + i)
                        .location(getRandomLocation())
                        .salary(getRandomSalary())
                        .build();

                jobFacade.create(jobData);
            }
            log.info("100 jobs have been successfully created!");
        } else {
            log.info("Jobs already exist. Skipping seeding process.");
        }
    }

    private String getRandomLocation() {
        String[] locations = {"New York", "San Francisco", "Los Angeles", "Chicago", "Boston", "Seattle"};
        return locations[random.nextInt(locations.length)];
    }

    private Double getRandomSalary() {
        double minSalary = 40000.0;
        double maxSalary = 150000.0;
        double salary = minSalary + (maxSalary - minSalary) * random.nextDouble();
        return BigDecimal.valueOf(salary).setScale(2, RoundingMode.HALF_UP).doubleValue();
    }
}