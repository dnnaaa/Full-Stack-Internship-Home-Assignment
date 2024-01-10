package ma.dnaengineering.backend.service;

import ma.dnaengineering.backend.model.Employee;
import ma.dnaengineering.backend.repository.EmployeeRepository;
import ma.dnaengineering.backend.util.CsvParserUtil;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class CsvParserService {
    private EmployeeRepository employeeRepository;

    public CsvParserService(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    public void saveEmployeesData(MultipartFile file){
        List<String[]> csvData = CsvParserUtil.readCsvData(file);
        List<Employee> employees =  csvData.stream()
                .skip(1)
                .map(data -> Employee.builder()
                        .id(Integer.parseInt(data[0]))
                        .name(data[1])
                        .jobTitle(data[2])
                        .salary(Double.parseDouble(data[3]))
                        .build())
                .collect(Collectors.toList());

        employeeRepository.saveAll(employees);
    }
    public List<Employee> getAllEmployees() {
        List<Employee> employees =  employeeRepository.findAll();
        return employees;
    }

    public Map<String, Double> calculateAverageSalary(List<Employee> employees) {
        return employees.stream()
                .collect(Collectors.groupingBy(Employee::getJobTitle,
                        Collectors.averagingDouble(Employee::getSalary)));
    }
}
