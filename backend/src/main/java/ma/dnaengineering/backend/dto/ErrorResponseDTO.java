package ma.dnaengineering.backend.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class ErrorResponseDTO {

    private String code;
    private String message;
    private LocalDateTime timestamp;

}
