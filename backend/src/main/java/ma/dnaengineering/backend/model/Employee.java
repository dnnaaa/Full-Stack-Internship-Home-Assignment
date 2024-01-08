package ma.dnaengineering.backend.model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class Employee {
    private long id;
    private String name;
    private String jobTitle;
    private double salary;




}

