package ma.dnaengineering.backend.Service;

import ma.dnaengineering.backend.Entity.Employee;
import ma.dnaengineering.backend.Repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;


import org.springframework.stereotype.Service;

;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;
import java.util.List;

@Service
public class EmployeeServiceImp implements EmployeeService{
    @Autowired
    private EmployeeRepository employeeRepository;

    @Override
    public List<Employee> getAllEmployees(int page, int perPage) {
        Pageable pageable = PageRequest.of(page, perPage);
        return employeeRepository.findAll(pageable).getContent();
    }
}
