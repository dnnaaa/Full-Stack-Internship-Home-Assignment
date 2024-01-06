package ma.dnaengineering.backend.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
@NoArgsConstructor
    public class ErrorResponse {
        private  String message;
        private HttpStatus httpStatus;
        private LocalDateTime timestamp;
}
