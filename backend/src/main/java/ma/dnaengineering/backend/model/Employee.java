package ma.dnaengineering.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;

@Entity
@Setter @Getter @ToString @AllArgsConstructor @NoArgsConstructor @Builder
public class Employee {
    @Id
    private int id;
    private String name;
    private String jobTitle;
    private double salary;
}
