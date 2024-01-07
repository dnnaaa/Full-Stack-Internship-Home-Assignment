package ma.dnaengineering.backend.repository;

import ma.dnaengineering.backend.entity.JobSummary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JobSummaryRepository extends JpaRepository<JobSummary,Long> {
}
