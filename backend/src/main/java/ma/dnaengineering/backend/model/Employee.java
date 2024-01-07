package ma.dnaengineering.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
public class Employee {

   @Id
   private Long id;
   private String employeeName; 
   private String jobTitle;
   private Double salary;

    
}
