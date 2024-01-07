package ma.dnaengineering.backend.controllers;


import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import ma.dnaengineering.backend.beans.FileData;
import ma.dnaengineering.backend.services.ProcessFileService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;

@RestController @AllArgsConstructor
public class Controller {
    private ProcessFileService processFileService;
    @PostMapping("/upload")
    @CrossOrigin(origins ={"http://localhost:3000"})
    public ArrayList<FileData> processFile(@RequestParam("employees")MultipartFile file, HttpServletResponse response) throws IOException {
        try{
            return processFileService.processFile(file);
        }catch (IOException ioException){
            response.getOutputStream().write("Error while reading the uploaded file".getBytes());
        }catch (RuntimeException runtimeException){
            response.setStatus(500);
            response.getOutputStream().write(runtimeException.getMessage().getBytes());
        }
        return null;
    }

}
