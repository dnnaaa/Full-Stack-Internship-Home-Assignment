package ma.dnaengineering.backend.dto;

import lombok.*;

import java.math.BigDecimal;


@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class JobResponse {
    private Long id;
    private String title;
    private String location;
    private BigDecimal salary;
}
