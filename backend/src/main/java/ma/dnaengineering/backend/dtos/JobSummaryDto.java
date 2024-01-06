package ma.dnaengineering.backend.dtos;

import lombok.*;

import java.util.Objects;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class JobSummaryDto {
    private String jobTitle;
    private double averageSalary;
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        JobSummaryDto that = (JobSummaryDto) o;
        return Double.compare(that.averageSalary, averageSalary) == 0 &&
                Objects.equals(jobTitle, that.jobTitle);
    }

    @Override
    public int hashCode() {
        return Objects.hash(jobTitle, averageSalary);
    }
}
