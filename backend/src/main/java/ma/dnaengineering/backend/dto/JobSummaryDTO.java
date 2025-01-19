package ma.dnaengineering.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class JobSummaryDTO {

    private Long id;
    private String title;
    private String location;
    private BigDecimal salary;
}
