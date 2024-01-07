package ma.dnaengineering.backend.repository;

import ma.dnaengineering.backend.Dto.JobSalaryDto;
import ma.dnaengineering.backend.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    @Query("SELECT NEW ma.dnaengineering.backend.Dto.JobSalaryDto(e.jobTitle, AVG(e.salary)) FROM Employee e GROUP BY e.jobTitle")
    List<JobSalaryDto> findAverageSalaryByJobTitle();
}
