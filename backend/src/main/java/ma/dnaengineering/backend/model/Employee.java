package ma.dnaengineering.backend.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class Employee {
    private int id;
    private String employeeName;
    private String jobTitle;
    private double salary;

}
