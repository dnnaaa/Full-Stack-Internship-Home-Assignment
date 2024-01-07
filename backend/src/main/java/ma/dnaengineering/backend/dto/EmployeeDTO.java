package ma.dnaengineering.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class EmployeeDTO {
    private int id;
    private String employeeName;
    private String jobTitle;
    private double salary;
}
