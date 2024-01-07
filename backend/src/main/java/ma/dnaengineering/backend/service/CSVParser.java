package ma.dnaengineering.backend.service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

import ma.dnaengineering.backend.dto.EmployeeDTO;
import ma.dnaengineering.backend.exceptions.EmployeeDataParsingException;
import org.springframework.stereotype.Component;

@Component
public class CSVParser {
    public List<EmployeeDTO> parseCSV(InputStream inputStream) throws EmployeeDataParsingException {
        List<EmployeeDTO> employees = new ArrayList<>();

        try (BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream))) {
            String line;
            boolean headerSkipped = false;

            while ((line = reader.readLine()) != null) {
                String[] values = line.split(",");

                if (!headerSkipped) {
                    headerSkipped = true;
                    continue;
                }

                if (values.length == 4) {
                    EmployeeDTO employee = new EmployeeDTO();
                    try {
                        employee.setId(Integer.parseInt(values[0]));
                        employee.setEmployeeName(values[1]);
                        employee.setJobTitle(values[2]);
                        employee.setSalary(Double.parseDouble(values[3]));
                        employees.add(employee);
                    } catch (NumberFormatException | IndexOutOfBoundsException e) {
                        throw new EmployeeDataParsingException("Error parsing data in CSV: " + e.getMessage());
                    }
                } else {
                    throw new EmployeeDataParsingException("Invalid data format in CSV");
                }
            }
        } catch (IOException e) {
            throw new EmployeeDataParsingException("Error reading CSV file: " + e.getMessage());
        }

        return employees;
    }

}



