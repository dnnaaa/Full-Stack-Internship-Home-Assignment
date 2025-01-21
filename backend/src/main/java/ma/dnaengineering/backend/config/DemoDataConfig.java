package ma.dnaengineering.backend.config;

import ma.dnaengineering.backend.entity.Job;
import ma.dnaengineering.backend.repository.IJobRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DemoDataConfig {

    @Bean
    public CommandLineRunner demoData(IJobRepository jobRepository) {
        return args -> {
            jobRepository.save(Job.builder()
                    .title("Software Engineer")
                    .description("Develop and maintain software applications.")
                    .location("Casablanca, Morocco")
                    .salary(45000.0)
                    .build());

            jobRepository.save(Job.builder()
                    .title("Data Scientist")
                    .description("Analyze and interpret complex data.")
                    .location("Rabat, Morocco")
                    .salary(50000.0)
                    .build());

            jobRepository.save(Job.builder()
                    .title("DevOps Engineer")
                    .description("Manage CI/CD pipelines and cloud infrastructure.")
                    .location("Remote")
                    .salary(60000.0)
                    .build());

            jobRepository.save(Job.builder()
                    .title("Frontend Developer")
                    .description("Create user-friendly web interfaces.")
                    .location("Tanger, Morocco")
                    .salary(40000.0)
                    .build());

            jobRepository.save(Job.builder()
                    .title("Backend Developer")
                    .description("Build and maintain server-side applications.")
                    .location("Casablanca, Morocco")
                    .salary(47000.0)
                    .build());

            jobRepository.save(Job.builder()
                    .title("Project Manager")
                    .description("Coordinate projects and teams.")
                    .location("Marrakech, Morocco")
                    .salary(55000.0)
                    .build());

            jobRepository.save(Job.builder()
                    .title("UI/UX Designer")
                    .description("Design user experiences and interfaces.")
                    .location("Rabat, Morocco")
                    .salary(42000.0)
                    .build());

            jobRepository.save(Job.builder()
                    .title("Quality Assurance Engineer")
                    .description("Test and ensure the quality of applications.")
                    .location("Casablanca, Morocco")
                    .salary(43000.0)
                    .build());

            jobRepository.save(Job.builder()
                    .title("Business Analyst")
                    .description("Analyze business requirements and processes.")
                    .location("Fes, Morocco")
                    .salary(48000.0)
                    .build());

            jobRepository.save(Job.builder()
                    .title("IT Support Specialist")
                    .description("Provide technical support to users.")
                    .location("Oujda, Morocco")
                    .salary(35000.0)
                    .build());

            jobRepository.save(Job.builder()
                    .title("Cybersecurity Analyst")
                    .description("Protect systems and networks from cyber threats.")
                    .location("Rabat, Morocco")
                    .salary(52000.0)
                    .build());

            jobRepository.save(Job.builder()
                    .title("Cloud Architect")
                    .description("Design and implement cloud solutions.")
                    .location("Remote")
                    .salary(65000.0)
                    .build());

            jobRepository.save(Job.builder()
                    .title("Database Administrator")
                    .description("Manage and maintain database systems.")
                    .location("Casablanca, Morocco")
                    .salary(46000.0)
                    .build());

            jobRepository.save(Job.builder()
                    .title("Mobile App Developer")
                    .description("Develop mobile applications for iOS and Android.")
                    .location("Tanger, Morocco")
                    .salary(44000.0)
                    .build());

            jobRepository.save(Job.builder()
                    .title("Machine Learning Engineer")
                    .description("Build machine learning models and pipelines.")
                    .location("Remote")
                    .salary(60000.0)
                    .build());
        };
    }
}

