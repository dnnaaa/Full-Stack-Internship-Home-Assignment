package ma.dnaengineering.backend.Repository;

import ma.dnaengineering.backend.Entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;




public interface EmployeeRepository extends JpaRepository<Employee,Integer> {

}
