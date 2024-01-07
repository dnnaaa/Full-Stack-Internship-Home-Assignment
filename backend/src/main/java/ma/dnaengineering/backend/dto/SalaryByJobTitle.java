package ma.dnaengineering.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@ToString
public class SalaryByJobTitle {
    private String jobTitle;
    private double averageSalary;
}
