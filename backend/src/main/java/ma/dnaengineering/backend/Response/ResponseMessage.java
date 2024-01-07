package ma.dnaengineering.backend.Response;

public class ResponseMessage {

    private String Mssg;
    public ResponseMessage(){

    }

    public ResponseMessage(String mssg) {
        Mssg = mssg;
    }

    public String getMssg() {
        return Mssg;
    }

    public void setMssg(String mssg) {
        Mssg = mssg;
    }
}
