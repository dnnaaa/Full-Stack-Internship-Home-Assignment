package ma.dnaengineering.backend.dto;

import lombok.*;

import java.math.BigDecimal;



@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class JobRequest {
    private String title;
    private  String description;
    private String location;
    private BigDecimal salary;
}
