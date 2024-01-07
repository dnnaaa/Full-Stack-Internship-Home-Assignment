package ma.dnaengineering.backend.service;

import com.opencsv.bean.CsvToBean;
import com.opencsv.bean.CsvToBeanBuilder;
import com.opencsv.bean.HeaderColumnNameMappingStrategy;
import lombok.RequiredArgsConstructor;
import ma.dnaengineering.backend.Dto.JobSalaryDto;
import ma.dnaengineering.backend.entity.Employee;
import ma.dnaengineering.backend.entity.EmployeeCsvRepresentation;
import ma.dnaengineering.backend.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Reader;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class EmployeeService {
    @Autowired
    private EmployeeRepository employeeRepository;
    public Integer uploadEmployees(MultipartFile file) throws IOException {
        Set<Employee> employees = parseCsv(file);
        employeeRepository.saveAll(employees);
        return employees.size();
    }
    public List<JobSalaryDto> getAverageSalaryByJobTitle() {
        return employeeRepository.findAverageSalaryByJobTitle();
    }


    Set<Employee> parseCsv(MultipartFile file) throws IOException {
        try(Reader reader = new BufferedReader(new InputStreamReader(file.getInputStream()))) {
            HeaderColumnNameMappingStrategy<EmployeeCsvRepresentation> strategy =
                    new HeaderColumnNameMappingStrategy<>();
            strategy.setType(EmployeeCsvRepresentation.class);
            CsvToBean<EmployeeCsvRepresentation> csvToBean =
                    new CsvToBeanBuilder<EmployeeCsvRepresentation>(reader)
                            .withMappingStrategy(strategy)
                            .withIgnoreEmptyLine(true)
                            .withIgnoreLeadingWhiteSpace(true)
                            .build();
            return csvToBean.parse()
                    .stream()
                    .map(csvLine -> Employee.builder()
                            .id(csvLine.getId())
                            .employeeName(csvLine.getEmployeeName())
                            .jobTitle(csvLine.getJobTitle())
                            .salary(csvLine.getSalary())
                            .build()
                    )
                    .collect(Collectors.toSet());
        }
    }
}
