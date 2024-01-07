package ma.dnaengineering.backend.service;

import ma.dnaengineering.backend.dto.EmployeeDTO;
import ma.dnaengineering.backend.dto.JobSummaryDTO;
import ma.dnaengineering.backend.exceptions.EmployeeDataParsingException;
import org.springframework.stereotype.Service;

import java.io.InputStream;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;


@Service
public class EmployeeServiceImpl implements EmployeeService {

    private final CSVParser csvParser;

    public EmployeeServiceImpl(CSVParser csvParser) {
        this.csvParser = csvParser;
    }

    @Override
    public List<EmployeeDTO> parseCSVAndReturnEmployees(InputStream inputStream) throws EmployeeDataParsingException {
        List<EmployeeDTO> employees = csvParser.parseCSV(inputStream);
        return employees;
    }

    @Override
    public List<JobSummaryDTO> calculateAverageSalaryPerJobTitle(List<EmployeeDTO> employees) {
        Map<String, Double> averageSalaries = employees.stream()
                .collect(Collectors.groupingBy(EmployeeDTO::getJobTitle,
                        Collectors.averagingDouble(EmployeeDTO::getSalary)));

        return averageSalaries.entrySet().stream()
                .map(entry -> new JobSummaryDTO(entry.getKey(), entry.getValue()))
                .collect(Collectors.toList());
    }
}

