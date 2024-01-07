package ma.dnaengineering.backend.entities;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.Reader;
import java.util.ArrayList;
import java.util.List;

public class MyOwnCsvparser {
	
	public List<Employee> parseCsv(Reader reader) throws IOException {
		
		List<Employee> employees = new ArrayList<>();
		
		try (BufferedReader bufferedReader = new BufferedReader(reader)){
			 // Skip the header line
            bufferedReader.readLine();
			
			String line;
			
			while ((line = bufferedReader.readLine()) != null) {
                String[] fields = line.split(",");
                if (fields.length == 4) {
                    Employee employee = new Employee(
                            Long.parseLong(fields[0].trim()),
                            fields[1].trim(),
                            fields[2].trim(),
                            Double.parseDouble(fields[3].trim())
                    );
                    employees.add(employee);
                } else {
                    // Handle invalid row or log a warning
                    System.out.println("Skipping invalid row: " + line);
                }
                
            }
			
			} 
		
		return employees;
		
		
	}

}
