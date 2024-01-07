package ma.dnaengineering.backend;

import org.springframework.stereotype.Service;
import org.springframework.util.ResourceUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class EmployeeService {
    /*public List<Employee> readEmployeesFromCSV(){
        List<Employee> employees=new ArrayList<>();

        try{
            String csvFile= ResourceUtils.getFile("classpath:data/employees.csv").getPath();
            BufferedReader bufferedReader=new BufferedReader(new FileReader(csvFile));

            bufferedReader.readLine();

            String line;
            while ((line=bufferedReader.readLine()) != null){
                String[] data=line.split(",");
                int id=Integer.parseInt(data[0]);
                String employee_name=data[1];
                String job_title=data[2];
                double salary=Double.parseDouble(data[3]);

                Employee employee=new Employee(id,employee_name,job_title,salary);
                employees.add(employee);

            }
            bufferedReader.close();

        } catch (FileNotFoundException e) {
            throw new RuntimeException(e);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        return employees;
    }*/

    public Map<String, Object> processEmployeeFile(MultipartFile file) {
        List<Employee> employees = new ArrayList<>();
        Map<String, Double> jobTitleAvgSalary = new HashMap<>();

        try (BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(file.getInputStream()))) {
            bufferedReader.readLine();

            String line;
            while ((line = bufferedReader.readLine()) != null) {
                String[] data = line.split(",");
                int id = Integer.parseInt(data[0]);
                String employee_name = data[1];
                String job_title = data[2];
                double salary = Double.parseDouble(data[3]);

                Employee employee = new Employee(id, employee_name, job_title, salary);
                employees.add(employee);
                jobTitleAvgSalary.put(job_title, jobTitleAvgSalary.getOrDefault(job_title, 0.0) + salary);
            }

            for (String job_title : jobTitleAvgSalary.keySet()) {
                double totalSalary = jobTitleAvgSalary.get(job_title);
                int count = (int) employees.stream().filter(emp -> emp.getJob_title().equals(job_title)).count();
                double avgSalary = totalSalary / count;
                DecimalFormat df = new DecimalFormat("#.##");
                avgSalary = Double.parseDouble(df.format(avgSalary));
                jobTitleAvgSalary.put(job_title, avgSalary);
            }
        } catch (IOException e) {
            // Handle IOException
            e.printStackTrace();
        }
        Map<String, Object> result = new HashMap<>();
        result.put("employees", employees);
        result.put("jobTitleAvgSalaries", jobTitleAvgSalary);
        return result;
    }

}
