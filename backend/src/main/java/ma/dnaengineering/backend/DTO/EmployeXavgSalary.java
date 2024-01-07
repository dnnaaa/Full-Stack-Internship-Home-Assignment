package ma.dnaengineering.backend.DTO;

import ma.dnaengineering.backend.models.Employe;

import java.util.List;
import java.util.Map;

public class EmployeXavgSalary {
    List<Employe> employes;
    Map<String,Double> avgSalaries;

    public EmployeXavgSalary(List<Employe> employes, Map<String, Double> employeesAverageSalary) {
        this.employes = employes;
        this.avgSalaries = employeesAverageSalary;
    }
}
