package ma.dnaengineering.backend.utils;

import ma.dnaengineering.backend.dto.EmployeeDTO;
import ma.dnaengineering.backend.mapper.EmployeeMapper;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public abstract class CSVParser {

    /**
     * Parses a CSV file and returns a list of EmployeeDTO objects.
     *
     * @param  file  the CSV file to be parsed
     * @return       the list of EmployeeDTO objects parsed from the file
     * @throws IOException if an I/O error occurs while reading the file
     */
    public static List<EmployeeDTO> parse(MultipartFile file) throws IOException {

        List<EmployeeDTO> employees = new ArrayList<>();

        String cvsString = new String(file.getBytes(), StandardCharsets.UTF_8);
        String[] lines = Arrays.stream(cvsString.split("\\r?\\n")).skip(1).toArray(String[]::new);
        for (String line : lines) {
            String[] values = line.split(",");
            Long id = Long.parseLong(values[0]);
            String name = values[1];
            String job = values[2];
            Float salary = Float.parseFloat(values[3]);

            EmployeeDTO employeeDTO = EmployeeMapper.mapToEmployeeDTO(id, name, job, salary);
            employees.add(employeeDTO);
        }

        return employees;
    }

}
