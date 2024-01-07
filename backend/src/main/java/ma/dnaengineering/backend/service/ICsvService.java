package ma.dnaengineering.backend.service;

import ma.dnaengineering.backend.bo.Employee;
import ma.dnaengineering.backend.web.CsvResponse;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface ICsvService {
	public CsvResponse getDataFromCsv(MultipartFile multipartFile) throws IOException;
}
