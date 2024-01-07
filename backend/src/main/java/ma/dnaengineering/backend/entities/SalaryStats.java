package ma.dnaengineering.backend.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor @AllArgsConstructor @Data
public class SalaryStats {

    private String jobTitle;

    private double averageSalary;

}
