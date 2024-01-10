package ma.dnaengineering.backend;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

public class EmployeeParser {
    private static final String SEPARATOR = ",";

    public static List<Employee> parse(InputStream inputStream) throws IOException {
        List<Employee> employees = new ArrayList<>();

        BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream));
        String line;

        // Skip the header row
        reader.readLine();

        while ((line = reader.readLine()) != null) {
            String[] values = line.split(SEPARATOR);

            if (values.length != 4) {
                throw new IOException("Invalid CSV line");
            }

            int id = Integer.parseInt(values[0]);
            String name = values[1];
            String jobTitle = values[2];
            double salary = Double.parseDouble(values[3]);

            employees.add(new Employee(id, name, jobTitle, salary));
        }

        return employees;
    }
}
