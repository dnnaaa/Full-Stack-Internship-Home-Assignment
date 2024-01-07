package ma.dnaengineering.backend.service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import ma.dnaengineering.backend.dao.EmployeeDao;
import ma.dnaengineering.backend.model.Employee;


@Service
public class EmployeeService implements IEmployeeService {


   @Autowired
   EmployeeDao employeeDao;

    private Employee lineToEmployee(String line)
    {
        String[] fields = line.split(",");
        Long id = Long.parseLong(fields[0]);
        String employeeName = fields[1];
        String jobTitle = fields[2];
        Double salary = Double.parseDouble(fields[3]);
        
        Employee employee =  new Employee(id, employeeName, jobTitle, salary);

        return employee;    
    }

    @Override
    public void saveEmployees(MultipartFile file) throws IOException {

        BufferedReader reader = new BufferedReader(new InputStreamReader(file.getInputStream()));

        reader.readLine();

        String line;
        while ((line = reader.readLine()) != null) {
            Employee employee = lineToEmployee(line);
            employeeDao.save(employee);
        }

        reader.close();
    }

    private  Map<String, Double> calculateAverageSalaryByJobTitle(List<Employee> employees) {
        return employees.stream()
                .collect(Collectors.groupingBy(Employee::getJobTitle,
                        Collectors.averagingDouble(Employee::getSalary)));
    
}


    @Override
    public Map<String, Double> getJobSummaries() {
        List<Employee> employees = employeeDao.findAll();
        Map<String, Double> averageSalaryByJobTitle = calculateAverageSalaryByJobTitle(employees);
        return averageSalaryByJobTitle;
    }


    @Override
    public Page<Employee> getAllEmployeesSortedByName(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("employeeName"));
        return employeeDao.findAll(pageable);
    }
}
