package ma.dnaengineering.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class Employee {
    private int id;
    private String name;
    private Job job;
    private double salary;

}
