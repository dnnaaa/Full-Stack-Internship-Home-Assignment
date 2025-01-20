package ma.dnaengineering.backend.dao.repositories;

import ma.dnaengineering.backend.dao.entities.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.util.List;

public interface JobRepository extends JpaRepository<Job, Long> {
    @Query("SELECT j FROM Job j WHERE " +
            "(:title IS NULL OR LOWER(j.title) LIKE LOWER(CONCAT('%', :title, '%'))) AND " +
            "(:location IS NULL OR LOWER(j.location) LIKE LOWER(CONCAT('%', :location, '%'))) AND " +
            "(:minSalary IS NULL OR j.salary >= :minSalary) AND " +
            "(:maxSalary IS NULL OR j.salary <= :maxSalary)")
    List<Job> filterJobs(
            @Param("title") String title,
            @Param("location") String location,
            @Param("minSalary") BigDecimal minSalary,
            @Param("maxSalary") BigDecimal maxSalary
    );
}
