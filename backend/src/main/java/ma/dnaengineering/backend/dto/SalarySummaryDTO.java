package ma.dnaengineering.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SalarySummaryDTO {

    private String jobTitle;
    private double averageSalary;
}
