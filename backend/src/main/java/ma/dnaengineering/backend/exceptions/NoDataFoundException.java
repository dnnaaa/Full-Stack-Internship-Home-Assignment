package ma.dnaengineering.backend.exceptions;

import org.springframework.http.HttpStatus;

public class NoDataFoundException extends RuntimeException{
    private final HttpStatus httpStatus;
    public NoDataFoundException(String message) {
        super(message);
        this.httpStatus = HttpStatus.NOT_FOUND;
    }
    public HttpStatus getHttpStatus() {
        return httpStatus;
    }
}
