package ma.dnaengineering.backend.controllers;

import ma.dnaengineering.backend.services.ParserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api")
public class ParserController {

    @Autowired
    private ParserService parserService;

    @PostMapping("/upload-csv")
    public Map<String, Object> uploadCsv(@RequestParam("file") MultipartFile file) throws IOException {
        return parserService.processCsv(file);
    }
}
