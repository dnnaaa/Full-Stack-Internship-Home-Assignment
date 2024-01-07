package ma.dnaengineering.backend.exception;

public class FileAlreadyExist extends Exception{
    public FileAlreadyExist(){}
    public FileAlreadyExist(String message){
        super(message);
    }


}
