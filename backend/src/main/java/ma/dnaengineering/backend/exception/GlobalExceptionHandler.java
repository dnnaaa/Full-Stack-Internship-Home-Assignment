package ma.dnaengineering.backend.exception;

import lombok.extern.log4j.Log4j2;
import ma.dnaengineering.backend.response.Response;
import ma.dnaengineering.backend.response.ResponseMessage;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.util.HashMap;

@Log4j2
@ControllerAdvice
public class GlobalExceptionHandler {
    /**
     * Handles all exceptions thrown by the application.
     * Returns a response with a failure status and an error message.
     * If the exception is not known, an unknown error message is returned.
     *
     * @param t the exception thrown
     * @return the response with the failure status and error message
     */
    @ExceptionHandler({Throwable.class})
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public @ResponseBody Response handleException(Throwable t) {
        // Log the exception
        log.info(t);

        // Create a new response object
        Response response = new Response();
        response.setStatus(ma.dnaengineering.backend.response.ResponseStatus.FAILURE);
        response.setMessage(ResponseMessage.ERROR);

        // Create a data map with the error message
        HashMap<String, Object> data = new HashMap<>();
        data.put("error", "An unknown error occurred.");
        response.setData(data);

        // Return the response
        return response;
    }
}
