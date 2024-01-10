package ma.dnaengineering.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class JobsSummary {
	private String job;
    private Double averageSalary;
}
