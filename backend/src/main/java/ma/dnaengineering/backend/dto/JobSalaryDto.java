package ma.dnaengineering.backend.dto;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class JobSalaryDto {
    private String job_title;
    private double salary;
}
