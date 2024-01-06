package ma.dnaengineering.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;


@Data
@AllArgsConstructor
@RequiredArgsConstructor
public class Employee {
    private Long id;
    private String employeeName;
    private String jobTitle;
    private double salary;


    // Getters and setters
}

