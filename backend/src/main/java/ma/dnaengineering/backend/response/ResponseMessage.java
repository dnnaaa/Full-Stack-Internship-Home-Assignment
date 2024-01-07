package ma.dnaengineering.backend.response;

public class ResponseMessage {
    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    private String message;
public ResponseMessage(){
}
public ResponseMessage(String message){
    super();
    this.message=message;
}
}
