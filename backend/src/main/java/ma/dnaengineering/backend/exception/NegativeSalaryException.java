package ma.dnaengineering.backend.exception;

public class NegativeSalaryException extends RuntimeException {
    public NegativeSalaryException(String message) {
        super(message);
    }
}
