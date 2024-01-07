package ma.dnaengineering.backend.dto;

import org.springframework.web.multipart.MultipartFile;

public class ReportRequest {

    private MultipartFile csvFile;

    public MultipartFile getCsvFile() {
        return csvFile;
    }

    public void setCsvFile(MultipartFile csvFile) {
        this.csvFile = csvFile;
    }
}
