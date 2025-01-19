package ma.dnaengineering.backend.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
public class ValidationErrorResponseDTO {

    private String code;
    private String message;
    private List<FieldError> errors;
    private LocalDateTime timestamp;

    @Data
    @Builder
    public static class FieldError {
        private String field;
        private String message;
    }

}
