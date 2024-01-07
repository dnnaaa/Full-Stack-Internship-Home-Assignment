package ma.dnaengineering.backend.Response;

public class ResponseMessage {
    private String message;
    public ResponseMessage(String message){
        super();
        this.message = message;

    }
    public String getMessage(){
        return message;
    }
    public  Void setMessage(String message){
        this.message = message;
        return null;
    }
}
