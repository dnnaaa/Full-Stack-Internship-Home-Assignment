package ma.dnaengineering.backend.Service;

import java.util.List;
import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

import ma.dnaengineering.backend.Entity.Employee;

public interface EmployeeService {

	public List<Employee> fetchEmployeeList();

	public boolean hasCsvFileFormat(MultipartFile file);

	public void processAndSaveData(MultipartFile file);

	public List<Map<String, Double>> getAverageSalary();

}
