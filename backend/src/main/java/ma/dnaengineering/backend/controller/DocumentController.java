package ma.dnaengineering.backend.controller;

import ma.dnaengineering.backend.entity.CSVData;
import ma.dnaengineering.backend.service.DocumentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/")
@CrossOrigin("*")
public class DocumentController {

    private final DocumentService documentService;

    public DocumentController(DocumentService documentService) {
        this.documentService = documentService;
    }

    @PostMapping("/upload")
    public ResponseEntity<CSVData> uploadCSV(@RequestBody MultipartFile file) {
        try {
            CSVData csvData = documentService.parseCSVFile(file);
            System.out.println(csvData.toString());
            return ResponseEntity.ok(csvData);
        } catch (Exception e) {
            System.out.println("--------salam--------");
            return ResponseEntity.badRequest().build();
        }
    }

}
