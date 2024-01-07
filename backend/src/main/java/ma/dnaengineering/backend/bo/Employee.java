package ma.dnaengineering.backend.bo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Employee {
	//id,employee_name,job_title,salary
	private Long id;
	private String employee_name;
	private String job_title;
	private double salary;

}
