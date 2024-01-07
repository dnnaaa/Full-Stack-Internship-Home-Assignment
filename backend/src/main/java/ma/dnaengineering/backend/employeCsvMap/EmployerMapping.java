package ma.dnaengineering.backend.employeCsvMap;

import com.opencsv.bean.CsvBindByName;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EmployerMapping {
    @CsvBindByName(column = "id")
    private Long id;

    @CsvBindByName(column = "employee_name")
    private String employee_name;

    @CsvBindByName(column = "job_title")
    private String job_title;

    @CsvBindByName(column = "salary")
    private Double salary;
}
