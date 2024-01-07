package ma.dnaengineering.backend.Service;

import ma.dnaengineering.backend.Entity.Employee;
import ma.dnaengineering.backend.Repository.EmployeeRepository;
import org.springframework.data.domain.Page;

import java.util.List;

public interface EmployeeService {

    List<Employee> getAllEmployees(int page, int perPage);

}
