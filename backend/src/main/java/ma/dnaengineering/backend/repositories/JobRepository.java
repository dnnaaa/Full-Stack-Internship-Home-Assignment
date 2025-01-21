package ma.dnaengineering.backend.repositories;

import ma.dnaengineering.backend.entities.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JobRepository extends JpaRepository<Job, Long> {}
