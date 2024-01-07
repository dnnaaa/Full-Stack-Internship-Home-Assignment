package ma.dnaengineering.backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EmployeeDTO {

    private int id;
    private String employeeName;
    private String jobTitle;

    private double salary;
}
