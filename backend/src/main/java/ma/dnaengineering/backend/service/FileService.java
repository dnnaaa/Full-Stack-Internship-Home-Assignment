package ma.dnaengineering.backend.service;

import ma.dnaengineering.backend.entity.Employee;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

public interface FileService {
    boolean hasCSVformat(MultipartFile filePath);

    boolean hasCSVformat(String filePath);

    boolean hasCSVformat();

    Map<String, Double> getAverageSalaryByJobTitle();

    List<Employee> getAllEmployees();

    void SaveData(MultipartFile filePath);

    void SaveData();
}
