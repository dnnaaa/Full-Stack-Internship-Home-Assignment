package ma.dnaengineering.backend.repository;

import ma.dnaengineering.backend.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

@RepositoryRestResource
public interface EmployeeRepository extends JpaRepository<Employee, Integer> {
}
