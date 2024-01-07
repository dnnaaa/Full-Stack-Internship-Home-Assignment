package ma.dnaengineering.backend.services;

import com.opencsv.bean.CsvToBean;
import com.opencsv.bean.CsvToBeanBuilder;
import com.opencsv.bean.HeaderColumnNameMappingStrategy;
import ma.dnaengineering.backend.dto.EmployeeAndAveragesDto;
import ma.dnaengineering.backend.dto.SalaryByJobTitle;
import ma.dnaengineering.backend.employeCsvMap.EmployerMapping;
import ma.dnaengineering.backend.model.Employee;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.*;
import java.util.ArrayList;
import java.util.List;

import java.util.Map;
import java.util.stream.Collectors;

@Service
public class EmployeeService implements IEmployeeService{


    public EmployeeAndAveragesDto uploadEmployeesAndProcess(
            MultipartFile file
    ){
        List<Employee> listOfEmployees = parseCsvToListOfEmployee(file);
        if(!listOfEmployees.isEmpty()){
            List<SalaryByJobTitle> listOfAverageByJobs =
                    getJobsByThereAverages(listOfEmployees);
            return new EmployeeAndAveragesDto(listOfEmployees,listOfAverageByJobs);
        }else
            throw new ResponseStatusException(
                    HttpStatus.NO_CONTENT,
                    "There is no employees"
                    );

    }
    public List<Employee> parseCsvToListOfEmployee(
            MultipartFile file
    ) {

        try(Reader reader =new BufferedReader(new InputStreamReader(file.getInputStream()))) {
            //to define the of the header of the file
            HeaderColumnNameMappingStrategy<EmployerMapping> strategy =
                    new HeaderColumnNameMappingStrategy<>();
            //the target class that will handle our data
            strategy.setType(EmployerMapping.class);

            //convert data to the target class
            CsvToBean<EmployerMapping> csvToEmployerMapping =
                    new CsvToBeanBuilder<EmployerMapping>(reader)
                            .withMappingStrategy(strategy)
                            .withIgnoreEmptyLine(true)
                            .withIgnoreLeadingWhiteSpace(true)
                            .build();
            return csvToEmployerMapping.parse()
                    .stream()
                    .map(csvLine -> Employee.builder()
                            .id(csvLine.getId())
                            .employee_name(csvLine.getEmployee_name())
                            .job_title(csvLine.getJob_title())
                            .salary(csvLine.getSalary())
                            .build()
                    )
                    .collect(Collectors.toList());
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public List<SalaryByJobTitle> getJobsByThereAverages(
            List<Employee> employeeList
    ){
        List<SalaryByJobTitle> listOfSalaryAverageByJobTitles = new ArrayList<>();
        //Map to sort the employee that have the same job title
        Map<String, List<Employee>> employeesByJob = employeeList.stream()
                .collect(Collectors.groupingBy(Employee::getJob_title));
        // Iterating on the Map collection to calculate the average
        employeesByJob.forEach((jobTitle, ListOfemployee) -> {
            double average =  ListOfemployee.stream()
                    .mapToDouble(Employee::getSalary)
                    .average()
                    .orElse(0.0);
            listOfSalaryAverageByJobTitles.add(new SalaryByJobTitle(jobTitle,average));
        });
        return listOfSalaryAverageByJobTitles;
    }
}


