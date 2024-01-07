package ma.dnaengineering.backend.services;

import ma.dnaengineering.backend.dto.EmployeeAndAveragesDto;
import ma.dnaengineering.backend.dto.SalaryByJobTitle;
import ma.dnaengineering.backend.model.Employee;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface IEmployeeService {
    //get the file and process the data then use dto to transfer it to the front
    public EmployeeAndAveragesDto uploadEmployeesAndProcess(MultipartFile file);
    //parse an csv file to a list of Employee
    public List<Employee> parseCsvToListOfEmployee(MultipartFile file)throws IOException;
    //to get all jobs salary average
    public List<SalaryByJobTitle> getJobsByThereAverages(List<Employee> employeeList);
}
