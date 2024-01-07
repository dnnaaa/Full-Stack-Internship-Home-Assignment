package ma.dnaengineering.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ma.dnaengineering.backend.entities.Employee;
import ma.dnaengineering.backend.entities.SalaryStats;

import java.util.List;
@NoArgsConstructor @AllArgsConstructor @Data
public class ReportResponse {

    List<Employee> employees;

    List<SalaryStats> salaryStats;

}