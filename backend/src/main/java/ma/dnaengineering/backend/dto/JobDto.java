package ma.dnaengineering.backend.dto;

import jakarta.validation.constraints.NotNull;
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
public class JobDto {

    private Long id;
    @NotNull
    private String title;
    private String description;
    private String location;
    @NotNull
    private BigDecimal salary;
    private LocalDateTime postedAt;
    private LocalDateTime updatedAt;

}

