package ma.dnaengineering.backend.exception;

/**
 * Custom exception for handling cases where a salary value is negative.
 * This exception extends {@link RuntimeException}, making it an unchecked exception.
 */
public class NegativeSalaryException extends RuntimeException {

    /**
     * Constructs a new {@code NegativeSalaryException} with the specified detail message.
     *
     * @param message the detail message that explains why the exception is thrown
     */
    public NegativeSalaryException(String message) {
        super(message);
    }
}
