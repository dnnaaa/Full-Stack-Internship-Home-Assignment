package ma.dnaengineering.backend.entity;

import com.opencsv.bean.CsvBindByName;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class EmployeeCsvRepresentation {
    @CsvBindByName(column = "id")
    private Long id;

    @CsvBindByName(column = "employee_name")
    private String employeeName;

    @CsvBindByName(column = "job_title")
    private String jobTitle;

    @CsvBindByName(column = "salary")
    private double salary;

}
