package ma.dnaengineering.backend.service;

import ma.dnaengineering.backend.response.Response;
import org.springframework.web.multipart.MultipartFile;

public interface EmployeeService {

    Response process(MultipartFile file);

    Response getEmployees(int page, int size);

    Response getJobSummaries(int page,int size);
}
