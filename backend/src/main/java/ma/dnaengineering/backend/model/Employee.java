package ma.dnaengineering.backend.model;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@ToString
@Builder
public class Employee {
    private Long id;
    private String employee_name;
    private String job_title;
    private Double salary;
}
