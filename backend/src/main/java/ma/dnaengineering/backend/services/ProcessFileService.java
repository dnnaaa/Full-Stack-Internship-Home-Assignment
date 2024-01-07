package ma.dnaengineering.backend.services;

import ma.dnaengineering.backend.beans.FileData;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;

public interface ProcessFileService {
    ArrayList<FileData> processFile(MultipartFile multipartFile) throws IOException,RuntimeException;
}
