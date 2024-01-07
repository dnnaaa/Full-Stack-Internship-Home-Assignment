package ma.dnaengineering.backend.services;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

import ma.dnaengineering.backend.entitys.Employee;

public interface FileService  {

	List<Employee> readFile(MultipartFile file)throws IOException;
	Map<String, Double> calculateAverageSalaryByJobTitle(List<Employee> employees);
	
}
