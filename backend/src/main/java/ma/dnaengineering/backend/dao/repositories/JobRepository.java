package ma.dnaengineering.backend.dao.repositories;

import ma.dnaengineering.backend.dao.entities.Job;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JobRepository extends JpaRepository<Job, Long> {

}
