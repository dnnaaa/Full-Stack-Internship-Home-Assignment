package ma.dnaengineering.backend.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import ma.dnaengineering.backend.entities.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Long>{
	
	@Query("SELECT e.job_title, AVG(e.salary) FROM Employee e GROUP BY e.job_title")
	List<Object[]> getJobsSummary();

}
