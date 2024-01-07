package ma.dnaengineering.backend;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.Map;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class CsvController {

    private final CsvParserService csvParserService;


    @PostMapping("/upload")
    public Map<String, Object> uploadCsvFile(@RequestParam("file") MultipartFile file) throws IOException {

        if(file.isEmpty()){
            throw new RuntimeException("the file does not exists");
        }

        String abs = file.getResource().getFile().getAbsolutePath();
        System.out.println("hello world " + abs );

        return csvParserService.processCsvData(abs);

    }


}
