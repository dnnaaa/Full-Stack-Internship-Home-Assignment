package ma.dnaengineering.backend.Repository;

import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import ma.dnaengineering.backend.Entity.Employee;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long>{

	//comment ignorer case 
	@Query("SELECT  employeeJobTitle as  jobTitle, AVG(employeeSalary) as averageSalary FROM Employee GROUP BY employeeJobTitle")
	public List<Map<String,Double>> getJobTitleAverageSalaries();
}
