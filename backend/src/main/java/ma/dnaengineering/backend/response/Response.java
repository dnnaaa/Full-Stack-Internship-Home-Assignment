package ma.dnaengineering.backend.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashMap;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Response {

    private ResponseStatus status;

    private ResponseMessage message;

    private HashMap<String, Object> data;

}