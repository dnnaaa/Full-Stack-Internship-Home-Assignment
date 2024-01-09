package ma.dnaengineering.backend.service;

import ma.dnaengineering.backend.entity.Employee;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

public interface FileService {
    public boolean hasCsvFormat(MultipartFile file);

    void processAndSaveData(MultipartFile file);

    List<Employee> getAllEmployees();

    List<Map.Entry<String, Double>> getAverageSalariesByJobTitle();
}
