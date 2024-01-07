package ma.dnaengineering.backend.web;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import ma.dnaengineering.backend.bo.Employee;

import java.util.List;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class CsvResponse {
	private List<Employee> employeeList;
	private Map<String,Double> jobSummary;
}
