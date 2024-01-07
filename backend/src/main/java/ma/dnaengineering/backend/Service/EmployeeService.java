package ma.dnaengineering.backend.Service;

import java.io.InputStream;
import java.util.List;
import java.util.Map;

import ma.dnaengineering.backend.Entities.Employee;

public interface EmployeeService {


    List<Employee> getEmployees(int page,int pageSize);
    Map<String,Double> calculateAverageSlaryByJobTitle(int page, int pageSize);
    void readCSV(InputStream inputStream);
    
}
