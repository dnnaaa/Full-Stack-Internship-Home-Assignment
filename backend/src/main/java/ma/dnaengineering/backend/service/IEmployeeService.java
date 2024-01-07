package ma.dnaengineering.backend.service;

import java.io.IOException;
import java.util.Map;

import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

import ma.dnaengineering.backend.model.Employee;

public interface IEmployeeService {

    void saveEmployees(MultipartFile file) throws IOException;

    Page<Employee> getAllEmployeesSortedByName(int page, int size);

    Map<String, Double> getJobSummaries();


    
}
