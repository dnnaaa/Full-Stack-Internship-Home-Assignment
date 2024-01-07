package ma.dnaengineering.backend.utils;

import ma.dnaengineering.backend.entities.Employee;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.util.ArrayList;
import java.util.List;

public class CsvParser {

    public static List<Employee> parse(MultipartFile file) {

        List<Employee> employees = new ArrayList<>();

        if(file==null)return employees;

        InputStream stream = null;
        try {
            stream = new BufferedInputStream(file.getInputStream());
        } catch (IOException e) {
//            throw new RuntimeException(e);
            return employees;
        }

        BufferedReader reader = new BufferedReader(new InputStreamReader(stream));


        // Parse line-by-line
        String line;

        int count=1; //to prevent the first line
        while (true) {

            try {
                if (!((line = reader.readLine()) != null)) break;
            } catch (IOException e) {
                continue;
            }
            if(count==1){
                count=0;
                continue;
            }
            String[] data = line.split(",");

            // Map data to Employee object
            Employee emp = new Employee();
            Long newId = null;
            try {
                newId = Long.parseLong(data[0]);
            } catch (NumberFormatException e) {
                throw new RuntimeException(e);
            }
            emp.setId(newId);
            emp.setName(data[1]);
            emp.setJobTitle(data[2]);
            Double newSalary = null;
            try {
                newSalary = Double.parseDouble(data[3]);
            } catch (NumberFormatException e) {
                throw new RuntimeException(e);
            }
            emp.setSalary(newSalary);

            employees.add(emp);
        }

        return employees;
    }
}
