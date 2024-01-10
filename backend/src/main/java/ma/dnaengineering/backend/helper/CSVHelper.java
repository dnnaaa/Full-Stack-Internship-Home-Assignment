package ma.dnaengineering.backend.helper;

import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

import ma.dnaengineering.backend.model.Employee;

public class CSVHelper {
    public static String TYPE = "text/csv";
    static String[] HEADERS = { "id", "employee_name", "job_title", "salary" };

    public static boolean hasCSVFormat(String contentType) {
        return TYPE.equals(contentType);
    }

    public static List<Employee> csvToEmployees(InputStream is) {
        List<Employee> employees = new ArrayList<>();

        try (BufferedReader fileReader = new BufferedReader(new InputStreamReader(is, StandardCharsets.UTF_8))) {
            String line;
            boolean isFirstRow = true;

            while ((line = fileReader.readLine()) != null) {
                if (isFirstRow) {
                    isFirstRow = false;
                    continue; // Skip header row
                }

                String[] fields = line.split(",");
                Employee employee = new Employee(
                        Long.parseLong(fields[0].trim()),
                        fields[1].trim(),
                        fields[2].trim(),
                        Double.parseDouble(fields[3].trim()));

                employees.add(employee);
            }
        } catch (IOException | NumberFormatException e) {
            throw new RuntimeException("Failed to parse CSV file: " + e.getMessage());
        }

        return employees;
    }

    public static ByteArrayInputStream employeesToCSV(List<Employee> employees) {
        try (ByteArrayOutputStream out = new ByteArrayOutputStream()) {
            StringBuilder csvData = new StringBuilder(String.join(",", HEADERS) + "\n");

            for (Employee employee : employees) {
                csvData.append(employee.getId()).append(',')
                        .append(employee.getName()).append(',')
                        .append(employee.getJobTitle()).append(',')
                        .append(employee.getSalary()).append('\n');
            }

            out.write(csvData.toString().getBytes(StandardCharsets.UTF_8));
            return new ByteArrayInputStream(out.toByteArray());
        } catch (IOException e) {
            throw new RuntimeException("Failed to export data to CSV file: " + e.getMessage());
        }
    }
}