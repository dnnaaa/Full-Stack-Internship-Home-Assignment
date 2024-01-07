package ma.dnaengineering.backend.service;

import ma.dnaengineering.backend.dto.EmployeeDTO;
import ma.dnaengineering.backend.dto.JobSummaryDTO;
import ma.dnaengineering.backend.exceptions.EmployeeDataParsingException;

import java.io.InputStream;
import java.util.List;

public interface EmployeeService {
    List<EmployeeDTO> parseCSVAndReturnEmployees(InputStream inputStream) throws EmployeeDataParsingException;
    List<JobSummaryDTO> calculateAverageSalaryPerJobTitle(List<EmployeeDTO> employees);
}

