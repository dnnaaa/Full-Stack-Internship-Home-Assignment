package ma.dnaengineering.backend.repository;

import ma.dnaengineering.backend.entity.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface JobRepository extends JpaRepository<Job, Long> {
  // Custom query methods
  List<Job> findByTitleContainingIgnoreCase(String title);
  List<Job> findByLocationContainingIgnoreCase(String location);
  List<Job> findBySalaryBetween(Double minSalary, Double maxSalary);
  Optional<Job> findByTitleAndLocation(String title, String location);

  // You can add more custom query methods as needed:
  List<Job> findByOrderBySalaryDesc();
  List<Job> findByOrderByPostedAtDesc();
}
