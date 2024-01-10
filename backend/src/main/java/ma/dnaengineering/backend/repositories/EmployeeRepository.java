package ma.dnaengineering.backend.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import ma.dnaengineering.backend.entities.Employee;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
	@Query("SELECT e.job, AVG(e.salary) FROM Employee e GROUP BY e.job")
    List<Object[]> getAverageSalaryByJob();
}
