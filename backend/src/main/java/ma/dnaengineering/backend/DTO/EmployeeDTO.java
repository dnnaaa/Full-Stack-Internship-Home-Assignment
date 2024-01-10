package ma.dnaengineering.backend.DTO;

import lombok.Builder;
import ma.dnaengineering.backend.models.Employee;

import java.util.List;
import java.util.Map;
@Builder
public record EmployeeDTO(
    List<Employee> employees,
    Map<String, Double> summary
) {
    }
