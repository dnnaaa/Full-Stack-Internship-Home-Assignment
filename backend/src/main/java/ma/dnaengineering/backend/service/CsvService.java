package ma.dnaengineering.backend.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import ma.dnaengineering.backend.dto.EmployeeDTO;
import ma.dnaengineering.backend.dto.EmployeesAverageDTO;
import ma.dnaengineering.backend.dto.JobSalaryDto;
import ma.dnaengineering.backend.exception.FileAlreadyExist;
import ma.dnaengineering.backend.exception.FileNotFound;
import ma.dnaengineering.backend.exception.FileTypeCsv;
import ma.dnaengineering.backend.utils.CsvDataProcess;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class CsvService {
    private final CsvDataProcess csvDataProcess;
    private final Path FILE_FOLDER = Paths.get("data");
    public String saveFile(MultipartFile file) throws IOException, FileTypeCsv, FileAlreadyExist, FileNotFound {
        log.info("*file uploaded :" + file.getOriginalFilename());
            if(!Files.exists(FILE_FOLDER))
                Files.createDirectories(FILE_FOLDER);

            Path toSave = this.FILE_FOLDER.resolve(Objects.requireNonNull(file.getOriginalFilename()));
            if(!toSave.getFileName().toString().toLowerCase().endsWith(".csv"))
                throw new FileTypeCsv();

            if(Files.exists(toSave)){
                return toSave.getFileName().toString();
            }

            Files.copy(file.getInputStream(), toSave);
            return toSave.getFileName().toString();
    }

    public EmployeesAverageDTO parsedCsvFile(String fileName) throws FileNotFound, IOException {
        List<EmployeeDTO> fileStructured;
        Path filePath = Paths.get("data",fileName);
        if(!Files.exists(filePath))
            throw new FileNotFound();

        fileStructured = csvDataProcess.parseCsvFile(fileName);

        return EmployeesAverageDTO.builder()
                .employeeDTOS(fileStructured)
                .jobSalaryDtos(getSalaryForJob(fileStructured))
                .build();
    }

    public List<JobSalaryDto> getSalaryForJob(List<EmployeeDTO> employees) {
        Map<String, Double> averageSalaries = employees.stream()
                .collect(Collectors.groupingBy(EmployeeDTO::getJob_title,
                        Collectors.averagingDouble(emp -> Double.parseDouble(emp.getSalary()))));

        return averageSalaries.entrySet().stream()
                .map(entry -> new JobSalaryDto(entry.getKey(), entry.getValue()))
                .collect(Collectors.toList());
    }
}
