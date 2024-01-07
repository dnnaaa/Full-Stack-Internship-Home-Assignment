package ma.dnaengineering.backend.dto;

import lombok.*;

@Getter@Setter
@Builder@AllArgsConstructor@NoArgsConstructor
public class EmployeeDTO {
    private String id;
    private String employee_name;
    private String job_title;
    private String salary;
}
