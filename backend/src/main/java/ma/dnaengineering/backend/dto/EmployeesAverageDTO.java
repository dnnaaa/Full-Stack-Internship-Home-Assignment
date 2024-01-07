package ma.dnaengineering.backend.dto;

import lombok.*;

import java.util.List;
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class EmployeesAverageDTO {
    private List<EmployeeDTO> employeeDTOS;
    private List<JobSalaryDto> jobSalaryDtos;
}
