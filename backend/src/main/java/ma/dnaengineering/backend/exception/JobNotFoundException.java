package ma.dnaengineering.backend.exception;

public class JobNotFoundException extends RuntimeException {
    public JobNotFoundException(Long id) {
        super("Could not find job with id " + id);
    }
}