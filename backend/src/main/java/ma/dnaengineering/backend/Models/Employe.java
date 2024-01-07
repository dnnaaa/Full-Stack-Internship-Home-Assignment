package ma.dnaengineering.backend.Models;
import lombok.*;
import javax.persistence.*;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
public class Employe {


    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer employeId;

    private String name;
    private String jobTitle;
    private double salary;


}
