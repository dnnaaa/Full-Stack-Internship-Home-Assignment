package ma.dnaengineering.backend.Repository;

import ma.dnaengineering.backend.Entity.Employees;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeRepository  extends JpaRepository<Employees, Long> {
}
