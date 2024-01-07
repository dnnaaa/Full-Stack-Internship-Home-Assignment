package ma.dnaengineering.backend.Service;

import org.springframework.web.multipart.MultipartFile;

public interface CsvService {
    boolean hasCsvFormat(MultipartFile csvfile);

    void processAndSaveData(MultipartFile csvfile);
}
