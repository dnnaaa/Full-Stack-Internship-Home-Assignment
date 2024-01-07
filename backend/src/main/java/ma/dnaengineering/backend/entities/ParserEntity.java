package ma.dnaengineering.backend.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class ParserEntity {

	private String id;
    private String employeeName;
    private String jobTitle;
    private Double salary;
	
}
