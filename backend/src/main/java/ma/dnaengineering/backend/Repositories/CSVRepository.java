package ma.dnaengineering.backend.Repositories;

import ma.dnaengineering.backend.Entities.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CSVRepository extends JpaRepository<Employee, Long> {

}
