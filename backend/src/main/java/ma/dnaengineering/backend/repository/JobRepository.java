package ma.dnaengineering.backend.repository;

import ma.dnaengineering.backend.entity.Job;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JobRepository extends JpaRepository<Job,Long>{
}
