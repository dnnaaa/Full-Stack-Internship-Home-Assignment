package ma.dnaengineering.backend.controllers;

import ma.dnaengineering.backend.services.ProcessingFilesService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/v1/proccess_file")
@CrossOrigin(origins = "http://localhost:3000") // Specify the allowed origin(s)
public class ProcessFile {
    private ProcessingFilesService ProcessingFileService;

    public ProcessFile(ProcessingFilesService processingFileService) {
        ProcessingFileService = processingFileService;
    }

    @PostMapping("/getEmployees")
    public ResponseEntity getEmployees(@RequestBody MultipartFile employeesFile) throws IOException {
        return this.ProcessingFileService.getEmployeesFromCSV(employeesFile);
    }
}
