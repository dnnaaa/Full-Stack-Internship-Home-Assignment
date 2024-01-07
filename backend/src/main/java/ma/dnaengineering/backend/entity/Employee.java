package ma.dnaengineering.backend.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder @Data
@AllArgsConstructor @NoArgsConstructor
public class Employee {
    private String id;
    private String name;
    private String jobTitle;
    private double salary;
}
