package ma.dnaengineering.backend;

import org.springframework.stereotype.Service;

import java.io.FileInputStream;
import java.io.IOException;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class EmployeeService {

    public static List<JobSummary> getAverageSalaryByJobTitle(List<Employee> employees) {
        Map<String, BigDecimal> totalSalaryByJobTitle = new HashMap<>();
        Map<String, Integer> jobTitleCount = new HashMap<>();

        // Calculer la somme des salaires par titre de poste
        for (Employee employee : employees) {
            String jobTitle = employee.getJobTitle();
            BigDecimal salary = BigDecimal.valueOf(employee.getSalary());

            totalSalaryByJobTitle.putIfAbsent(jobTitle, BigDecimal.ZERO);
            jobTitleCount.putIfAbsent(jobTitle, 0);

            totalSalaryByJobTitle.put(jobTitle, totalSalaryByJobTitle.get(jobTitle).add(salary));
            jobTitleCount.put(jobTitle, jobTitleCount.get(jobTitle) + 1);
        }

        // Calculer la moyenne des salaires par titre de poste
        List<JobSummary> jobSummaries = new ArrayList<>();
        for (Map.Entry<String, BigDecimal> entry : totalSalaryByJobTitle.entrySet()) {
            String jobTitle = entry.getKey();
            BigDecimal totalSalary = entry.getValue();
            int count = jobTitleCount.get(jobTitle);

            BigDecimal averageSalary = count > 0 ? totalSalary.divide(BigDecimal.valueOf(count), 2, BigDecimal.ROUND_HALF_UP) : BigDecimal.ZERO;

            JobSummary jobSummary = new JobSummary();
            jobSummary.setJobTitle(jobTitle);
            jobSummary.setAverageSalary(averageSalary);

            jobSummaries.add(jobSummary);
        }

        return jobSummaries;
    }

    public List<Employee> getEmployees(String csvFile) throws IOException {
        FileInputStream inputStream = new FileInputStream(csvFile);

        return EmployeeParser.parse(inputStream);
    }
}
