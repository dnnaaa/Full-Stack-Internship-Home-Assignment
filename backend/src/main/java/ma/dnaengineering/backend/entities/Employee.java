package ma.dnaengineering.backend.entities;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Employee {

    private Long id;
    private String employeeName;
    private String jobTitle;
    private Double salary;
}
