package ma.dnaengineering.backend.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import ma.dnaengineering.backend.dto.EmployeesAverageDTO;
import ma.dnaengineering.backend.exception.FileAlreadyExist;
import ma.dnaengineering.backend.exception.FileNotFound;
import ma.dnaengineering.backend.exception.FileTypeCsv;
import ma.dnaengineering.backend.service.CsvService;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/csv")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin("http://localhost:3000")
public class CsvController {
    private final CsvService csvService;

    @GetMapping("/{fileName}")
    public ResponseEntity<EmployeesAverageDTO> getCsvParsedFile(@PathVariable("fileName") String fileName) throws FileNotFound, IOException {
        log.info("arriving fileName : " + fileName );
        return new ResponseEntity<>(csvService.parsedCsvFile(fileName), HttpStatusCode.valueOf(200));
    }
    @PostMapping
    public ResponseEntity<String> uploadCsv(@RequestParam("file")MultipartFile file) throws IOException, FileTypeCsv, FileAlreadyExist, FileNotFound {
        log.info("arriving .......................;;");
        log.info("*file uploaded Controller:" + file.getOriginalFilename());
        return new ResponseEntity<>(csvService.saveFile(file), HttpStatusCode.valueOf(200));
    }
}
