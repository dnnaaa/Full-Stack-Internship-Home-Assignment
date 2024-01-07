package ma.dnaengineering.backend.Service;

import ma.dnaengineering.backend.Entity.Employees;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

public interface FileService {
    

    void SaveData(MultipartFile filep);

    boolean hasCsvFormat(MultipartFile filep);

    void processAndSaveData(MultipartFile filep) throws IOException;

    List<Employees> getAllEmployees();

    Map<String, Double> getAverageSalaryByJobTitle();

    boolean hasCsvFormat();


    void SaveData();
}
