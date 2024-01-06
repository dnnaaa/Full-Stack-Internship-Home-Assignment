package ma.dnaengineering.backend.dtos;

import lombok.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ResponseDto {
    private List<EmployeeDto> employeeDtos= new ArrayList<>();
    private List<JobSummaryDto> jobSummaryDtos = new ArrayList<>();

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ResponseDto that = (ResponseDto) o;
        return Objects.equals(employeeDtos, that.employeeDtos) &&
                Objects.equals(jobSummaryDtos, that.jobSummaryDtos);
    }

    @Override
    public int hashCode() {
        return Objects.hash(employeeDtos, jobSummaryDtos);
    }
}
