package ma.dnaengineering.backend.service;

import ma.dnaengineering.backend.entities.Employee;
import ma.dnaengineering.backend.entities.JobsSummary;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class EmployeeServiceImpl implements EmployeeService {

    private static List<Employee> employees;

    static {
        employees = new ArrayList<>();
    }

    @Override
    public List<Employee> findAll() {
        return employees;
    }

    @Override
    public void add(Employee employee) {
        employees.add(employee);
    }

    @Override
    public void deleteAll() {
        employees.clear();
    }

    @Override
    public List<JobsSummary> calculateSummary() {
        Map<String, JobsSummary> jobsSummaryMap = new HashMap<>();
        for (Employee employee : employees) {
            String jobTitle = employee.getJobTitle();
            JobsSummary jobsSummary = jobsSummaryMap.computeIfAbsent(jobTitle, k -> new JobsSummary());
            jobsSummary.incrementCountAndAddSalary(employee.getSalary());
        }

        List<JobsSummary> jobsSummaries = new ArrayList<>();
        for (Map.Entry<String, JobsSummary> entry : jobsSummaryMap.entrySet()) {
            String jobTitle = entry.getKey();
            JobsSummary jobsSummary = entry.getValue();
            jobsSummary.setJobTitle(jobTitle);
            jobsSummary.setAvgSalary(jobsSummary.getTotalSalary() / jobsSummary.getCount());
            jobsSummaries.add(jobsSummary);
        }

        return jobsSummaries;
    }

}
