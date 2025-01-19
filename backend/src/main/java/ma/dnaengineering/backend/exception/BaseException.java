package ma.dnaengineering.backend.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public  abstract class BaseException extends RuntimeException {

    private final String message;
    private final ErrorCode errorCode; // Enum for error codes
    private final HttpStatus httpStatus;

    protected BaseException(String message, ErrorCode errorCode, HttpStatus httpStatus) {
        super(message);
        this.message = message;
        this.errorCode = errorCode;
        this.httpStatus = httpStatus;
    }

}
