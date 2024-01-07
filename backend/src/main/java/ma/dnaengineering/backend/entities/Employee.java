package ma.dnaengineering.backend.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class Employee {

    private Long id;

    private String name;

    private String jobTitle;

    private Double salary;
}
