package ma.dnaengineering.backend.repositories;

import ma.dnaengineering.backend.entities.Job;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JobRepository extends JpaRepository<Job, Long> {
}