package ma.dnaengineering.backend.services;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class CSVService {

    public List<Map<String, String>> parseCSVAndGetEmployees(MultipartFile file) {
        List<Map<String, String>> employeesList = new ArrayList<>();

        try (BufferedReader reader = new BufferedReader(new InputStreamReader(file.getInputStream()))) {
            String line;
            boolean isFirstLine = true;
            String[] headers = null;

            while ((line = reader.readLine()) != null) {
                String[] data = line.split(",");

                if (isFirstLine) {
                    headers = data;
                    isFirstLine = false;
                } else {
                    Map<String, String> employee = new HashMap<>();
                    for (int i = 0; i < data.length; i++) {
                        employee.put(headers[i], data[i]);
                    }
                    employeesList.add(employee);
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
            // Handle exception properly
        }

        return employeesList;
    }

    public List<Map<String, Double>> calculateJobSummary(List<Map<String, String>> employeesList) {
        Map<String, Double> jobSummary = new HashMap<>();
        Map<String, Integer> jobCount = new HashMap<>();

        for (Map<String, String> employee : employeesList) {
            String jobTitle = employee.get("job_title");
            double salary = Double.parseDouble(employee.get("salary"));

            jobSummary.put(jobTitle, jobSummary.getOrDefault(jobTitle, 0.0) + salary);
            jobCount.put(jobTitle, jobCount.getOrDefault(jobTitle, 0) + 1);
        }

        List<Map<String, Double>> jobsList = new ArrayList<>();
        for (String jobTitle : jobSummary.keySet()) {
            double averageSalary = jobSummary.get(jobTitle) / jobCount.get(jobTitle);
            Map<String, Double> job = new HashMap<>();
            job.put("jobTitle", Double.valueOf(jobTitle));
            job.put("averageSalary", averageSalary);
            jobsList.add(job);
        }

        return jobsList;
    }
}
