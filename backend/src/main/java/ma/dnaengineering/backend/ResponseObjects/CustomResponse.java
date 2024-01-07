package ma.dnaengineering.backend.ResponseObjects;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import ma.dnaengineering.backend.Models.Employee;

import java.util.HashMap;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CustomResponse {
    private List<Employee> employees;
    private HashMap<String, Double> summary;
    String message="" ;
}
