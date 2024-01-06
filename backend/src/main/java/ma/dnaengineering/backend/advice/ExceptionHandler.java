package ma.dnaengineering.backend.advice;

import ma.dnaengineering.backend.dtos.ErrorResponse;
import ma.dnaengineering.backend.exceptions.NoDataFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;

import java.io.IOException;
import java.time.LocalDateTime;

@ControllerAdvice
public class ExceptionHandler {
    @org.springframework.web.bind.annotation.ExceptionHandler(IOException.class)
    public ResponseEntity<ErrorResponse> handleIOException(IOException ex) {
        String errorMessage = "Error processing the file. Please try again.";
        ErrorResponse errorResponse = new ErrorResponse(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR,  LocalDateTime.now());
        return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @org.springframework.web.bind.annotation.ExceptionHandler(NoDataFoundException.class)
    public  ResponseEntity<ErrorResponse> HnadleEntityNotFoundException(NoDataFoundException ex){
        ErrorResponse errorResponse = new ErrorResponse(ex.getMessage(), ex.getHttpStatus() ,LocalDateTime.now());
        return new ResponseEntity<>(errorResponse, ex.getHttpStatus());
    }
}
