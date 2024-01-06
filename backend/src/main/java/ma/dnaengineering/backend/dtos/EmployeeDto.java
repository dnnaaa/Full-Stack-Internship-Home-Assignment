package ma.dnaengineering.backend.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Objects;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class EmployeeDto {
    private  Integer id;
    private String employeeName;
    private String jobTitle;
    private double  salary;
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        EmployeeDto that = (EmployeeDto) o;
        return Double.compare(that.salary, salary) == 0 &&
                Objects.equals(id, that.id) &&
                Objects.equals(employeeName, that.employeeName) &&
                Objects.equals(jobTitle, that.jobTitle);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, employeeName, jobTitle, salary);
    }

}
