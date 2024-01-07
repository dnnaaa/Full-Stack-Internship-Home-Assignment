package ma.dnaengineering.backend.advice;

import ma.dnaengineering.backend.exception.FileAlreadyExist;
import ma.dnaengineering.backend.exception.FileNotFound;
import ma.dnaengineering.backend.exception.FileTypeCsv;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

@ControllerAdvice
public class ExceptionHandlerController {

    @ExceptionHandler(FileTypeCsv.class)
    public ResponseEntity<String> handleIsValidCsvFile(Exception ex, WebRequest request) {
        return new ResponseEntity<>("File Should be csv type", null, HttpStatus.NOT_ACCEPTABLE);
    }

    @ExceptionHandler(FileAlreadyExist.class)
    public ResponseEntity<String> handleFileAlreadyExist(Exception ex, WebRequest request) {
        return new ResponseEntity<>("File Already Exist", null, HttpStatus.CONFLICT);
    }

    @ExceptionHandler(FileNotFound.class)
    public ResponseEntity<String> handleFileNotFound(Exception ex, WebRequest request) {
        return new ResponseEntity<>("File Not Found ! Check the fileName", null, HttpStatus.NOT_FOUND);
    }
}
