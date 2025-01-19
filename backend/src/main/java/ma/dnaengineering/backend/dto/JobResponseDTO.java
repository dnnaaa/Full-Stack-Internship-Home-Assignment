package ma.dnaengineering.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class JobResponseDTO {

    private Long id;
    private String title;
    private String description;
    private String location;
    private BigDecimal salary;
    private LocalDateTime postedAt;
    private LocalDateTime updatedAt;

}

