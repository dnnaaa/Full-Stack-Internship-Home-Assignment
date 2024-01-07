package ma.dnaengineering.backend.Dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class JobSalaryDto {
    private String jobTitle;
    private double averageSalary;
}
