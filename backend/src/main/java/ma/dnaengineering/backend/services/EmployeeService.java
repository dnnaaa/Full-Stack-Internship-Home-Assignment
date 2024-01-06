package ma.dnaengineering.backend.services;

import ma.dnaengineering.backend.dtos.EmployeeDto;
import ma.dnaengineering.backend.dtos.JobSummaryDto;
import ma.dnaengineering.backend.dtos.ResponseDto;
import ma.dnaengineering.backend.exceptions.NoDataFoundException;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;


public interface EmployeeService {
    ResponseDto processCSV(MultipartFile fileData) throws IOException, NoDataFoundException;
    List<EmployeeDto> readFile(byte[] fileData) throws IOException;
    List<JobSummaryDto> calculateAverageSalary(List<EmployeeDto> employees);


}
