package ma.dnaengineering.backend.exceptions;

public class EmployeeDataParsingException extends Exception {
    public EmployeeDataParsingException(String message) {
        super(message);
    }

    public EmployeeDataParsingException(String message, Throwable cause) {
        super(message, cause);
    }
}

