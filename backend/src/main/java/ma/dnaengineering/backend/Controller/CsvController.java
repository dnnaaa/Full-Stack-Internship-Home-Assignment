package ma.dnaengineering.backend.Controller;

import ma.dnaengineering.backend.Response.ResponseMessage;
import ma.dnaengineering.backend.Service.CsvService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/files")
@CrossOrigin(origins = "http://localhost:3000")
public class CsvController {
    @Autowired
    private CsvService service;


    @PostMapping("/upload")
    public ResponseEntity<ResponseMessage> uploadCsvFile(@RequestParam("csv-file") MultipartFile csvfile){
        if(service.hasCsvFormat(csvfile)){
            service.processAndSaveData(csvfile);
            return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage("THE CSV FILE UPLOADES SUCCESSFULLY " + csvfile.getOriginalFilename()));
        }
        return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new ResponseMessage("please upload a csv file "));

    }
}
