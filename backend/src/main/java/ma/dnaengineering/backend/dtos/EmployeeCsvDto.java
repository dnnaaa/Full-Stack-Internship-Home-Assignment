package ma.dnaengineering.backend.dtos;

import lombok.Builder;
import ma.dnaengineering.backend.models.Employee;

import java.util.List;
import java.util.Map;

@Builder
public record EmployeeCsvDto(
        List<Employee> employees,
        Map<String, Double> summary
) {
}
