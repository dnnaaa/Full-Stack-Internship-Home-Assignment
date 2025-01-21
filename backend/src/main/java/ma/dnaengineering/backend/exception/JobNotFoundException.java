package ma.dnaengineering.backend.exception;

/**
 * Custom exception for handling cases where a job is not found.
 * This exception extends {@link RuntimeException}, making it an unchecked exception.
 */
public class JobNotFoundException extends RuntimeException {

    /**
     * Constructs a new {@code JobNotFoundException} with the specified detail message.
     *
     * @param message the detail message that explains why the exception is thrown
     */
    public JobNotFoundException(String message) {
        super(message);
    }
}
