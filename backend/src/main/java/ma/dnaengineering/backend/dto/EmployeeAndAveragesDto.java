package ma.dnaengineering.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import ma.dnaengineering.backend.model.Employee;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class EmployeeAndAveragesDto {
    private List<Employee> employeeList;
    private List<SalaryByJobTitle> listOfAverages;
}
