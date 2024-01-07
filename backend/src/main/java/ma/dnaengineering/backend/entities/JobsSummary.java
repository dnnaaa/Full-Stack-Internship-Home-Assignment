package ma.dnaengineering.backend.entities;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class JobsSummary {

    private String jobTitle;
    private Double avgSalary;
    private int count=0;
    private Double totalSalary=0d;

    public void incrementCountAndAddSalary(double salary) {
        this.count++;
        this.totalSalary += salary;
    }
}
