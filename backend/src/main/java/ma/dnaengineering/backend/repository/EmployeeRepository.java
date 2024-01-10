package ma.dnaengineering.backend.repository;

import ma.dnaengineering.backend.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository extends JpaRepository<Employee, Integer> {

}
