package ma.dnaengineering.backend.model;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Employee {
    private long id;
    private String employeeName;
    private String jobTitle;
    private double salary;

}
