package ma.dnaengineering.backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;

import java.util.HashMap;
import java.util.Map;

/**
 * Global exception handler for the application.
 * This class centralizes exception handling and maps exceptions to appropriate HTTP responses.
 */
@ControllerAdvice
public class GlobalExceptionHandler {

    /**
     * Handles exceptions of type {@link JobNotFoundException}.
     * Returns a 404 (Not Found) status with the exception's message.
     *
     * @param ex the {@link JobNotFoundException} to handle
     * @return a response entity containing the exception message and HTTP status 404
     */
    @ExceptionHandler(JobNotFoundException.class)
    public ResponseEntity<String> handleJobNotFoundException(JobNotFoundException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
    }

    /**
     * Handles exceptions of type {@link NegativeSalaryException}.
     * Returns a 400 (Bad Request) status with the exception's message.
     *
     * @param ex the {@link NegativeSalaryException} to handle
     * @return a response entity containing the exception message and HTTP status 400
     */
    @ExceptionHandler(NegativeSalaryException.class)
    public ResponseEntity<String> handleNegativeSalary(NegativeSalaryException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
    }

    /**
     * Handles generic exceptions of type {@link Exception}.
     * Returns a 500 (Internal Server Error) status with a general error message.
     *
     * @param ex the {@link Exception} to handle
     * @return a response entity containing a generic error message and HTTP status 500
     */
    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleGenericException(Exception ex) {
        return new ResponseEntity<>("An error occurred: " + ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    /**
     * Handles validation exceptions of type {@link MethodArgumentNotValidException}.
     * Extracts field-level validation errors and returns them as a map of field names to error messages.
     * Returns a 400 (Bad Request) status.
     *
     * @param ex the {@link MethodArgumentNotValidException} to handle
     * @return a response entity containing a map of validation errors and HTTP status 400
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidationExceptions(MethodArgumentNotValidException ex) {
        // Create a map to store field-level validation errors
        Map<String, String> errors = new HashMap<>();
        // Loop through all validation errors and add them to the map
        ex.getBindingResult().getAllErrors().forEach(error -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        // Return the error map with HTTP status 400
        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
    }
}
