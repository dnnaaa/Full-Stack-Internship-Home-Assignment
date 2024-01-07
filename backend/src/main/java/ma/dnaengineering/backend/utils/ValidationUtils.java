package ma.dnaengineering.backend.utils;

import org.springframework.web.multipart.MultipartFile;

import java.util.Objects;

public abstract class ValidationUtils {
    public static boolean isValidFile(MultipartFile file) {
        return file != null && !file.isEmpty() && (Objects.equals(file.getContentType(), "text/csv") || Objects.equals(file.getContentType(), "text/plain"));
    }
}
