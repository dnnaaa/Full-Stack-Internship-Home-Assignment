package ma.dnaengineering.backend.parser;

import ma.dnaengineering.backend.model.Employee;
import org.springframework.stereotype.Component;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

@Component
public class CsvParserImpl implements CsvParser {

    @Override
    public List<Employee> parseCsv(InputStream inputStream) throws IOException {
        List<Employee> employees = new ArrayList<>();
        try (BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(inputStream))) {
            // Skip the header row
            bufferedReader.readLine();
            String line;
            while ((line = bufferedReader.readLine()) != null) {
                String[] strData = line.split(",");
                long id = Long.parseLong(strData[0]);
                String employeeName = strData[1];
                String jobTitle = strData[2];
                double salary = Double.parseDouble(strData[3]);
                employees.add(new Employee(id, employeeName, jobTitle, salary));
            }
        }
        return employees;
    }
}
