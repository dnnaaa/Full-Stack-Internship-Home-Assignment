package ma.dnaengineering.backend.Services;

import ma.dnaengineering.backend.Models.Employee;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class EmployeeService {
    public Map<String, Object> processCSV(MultipartFile file) {
        Map<String,Object> result = new HashMap(); // this will store the responce { "EmployeersList":[{...},{...},...], "JobTitleAVG":{....} }
        List<Employee> EmployeersList = this.readEmployeesFromCSV(file);
        Map<String, Double> JobTitleAVG = this.calculateAverageSalaryByJobTitle(EmployeersList);
        result.put("EmployeersList", EmployeersList);
        result.put("JobTitleAVG", JobTitleAVG);
        return result;
    }

    public List<Employee> readEmployeesFromCSV(MultipartFile file) {
        List<Employee> employees = new ArrayList();
        try {
            BufferedReader br = new BufferedReader(new InputStreamReader(file.getInputStream()));
            String line;
            while ((line = br.readLine()) != null) {
                String[] data = line.split(",");
                if(data[0].equals("id")) continue; // skipping the first line which is the header of the data
                Employee employee = new Employee();
                employee.setId(Integer.parseInt(data[0].trim()));
                employee.setName(data[1].trim());
                employee.setJobTitle(data[2].trim());
                employee.setSalary(Double.parseDouble(data[3].trim()));
                employees.add(employee);
            }
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return employees;
    }

    public Map<String, Double> calculateAverageSalaryByJobTitle(List<Employee> employees) {
        Map<String, Double> totalSalaryByJobTitle = new HashMap(); // store the total salary for each jobTitle
        Map<String, Integer> jobCount = new HashMap(); // store the number fo employees that are working under the same jobTitle
        Map<String, Double> averageSalaries = new HashMap(); // store the average salary of each jobTitle

        for (Employee employee : employees) {
            String jobTitle = employee.getJobTitle();
            // summing the Salarys of employeers that that working under the same jobTitle
            totalSalaryByJobTitle.put(jobTitle, totalSalaryByJobTitle.getOrDefault(jobTitle, 0.0) + employee.getSalary());
            // counting how many employeers that are working under the same jobTitle
            jobCount.put(jobTitle, jobCount.getOrDefault(jobTitle, 0) + 1);
        }

        for (String jobTitle : totalSalaryByJobTitle.keySet()) {
            double totalSalary = totalSalaryByJobTitle.get(jobTitle); // getting tthe total salarys of a jobTotle
            int count = jobCount.get(jobTitle); // getting how many employeers who are working under the jobTitle
            double averageSalary = totalSalary / count ; // calculating the avg of the jobTitle
            averageSalaries.put(jobTitle, averageSalary); // adding the avg of the jobTitle to the list
        }
        return averageSalaries;
    }

}
