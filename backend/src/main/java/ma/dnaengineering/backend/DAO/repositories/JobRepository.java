package ma.dnaengineering.backend.DAO.repositories;

import ma.dnaengineering.backend.DAO.entities.Job;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JobRepository extends JpaRepository<Job, Long> {
}
