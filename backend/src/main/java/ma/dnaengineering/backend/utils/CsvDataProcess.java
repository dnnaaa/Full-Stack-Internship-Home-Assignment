package ma.dnaengineering.backend.utils;

import ma.dnaengineering.backend.dto.EmployeeDTO;
import org.springframework.stereotype.Component;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
@Component
public class CsvDataProcess {
    public List<EmployeeDTO> parseCsvFile(String fileName) throws IOException {
        List<EmployeeDTO> fileStructured = new ArrayList<>();
        BufferedReader bufferedReader;
        InputStreamReader inputStreamReader;
        Path filePath = Paths.get("data",fileName);

        inputStreamReader = new InputStreamReader(Files.newInputStream(filePath));
        bufferedReader = new BufferedReader(inputStreamReader);
        String line;
        boolean isFirstLine = true;
        while ((line = bufferedReader.readLine()) != null) {
            if(isFirstLine){
                isFirstLine = false;
                continue;
            }
            String[] fields = line.split(",");
            EmployeeDTO employeeDTO = EmployeeDTO.builder()
                    .id(fields[0])
                    .employee_name(fields[1])
                    .job_title(fields[2])
                    .salary(fields[3])
                    .build();
            fileStructured.add(employeeDTO);
        }
        return fileStructured;
    }
}
