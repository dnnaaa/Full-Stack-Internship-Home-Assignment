package ma.dnaengineering.backend.Entities;

import jakarta.persistence.*;
import lombok.*;

@Data @AllArgsConstructor @NoArgsConstructor @Getter @Setter
@Entity
public class Employee {
    @Id
    private Long id;
    private String name;
    private String jobTitle;
    private double salary;

}
