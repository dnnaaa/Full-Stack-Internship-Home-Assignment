package ma.dnaengineering.backend.services;

import ma.dnaengineering.backend.dto.ReportResponse;
import ma.dnaengineering.backend.entities.Employee;
import ma.dnaengineering.backend.entities.SalaryStats;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ReportService {


    public ReportResponse generateReport(List<Employee> employees) {


        // Group employees by job title
        Map<String, List<Employee>> employeesByTitle = groupEmployeesByTitle(employees);

        // Generate avg stats for each title
        List<SalaryStats> stats = calculateAvgSalaryByTitle(employeesByTitle);

        ReportResponse response = new ReportResponse();
        response.setEmployees(employees); // paginated
        response.setSalaryStats(stats);

        return response;
    }

    public Map<String, List<Employee>> groupEmployeesByTitle(List<Employee> employees) {
        Map<String, List<Employee>> map = new HashMap<>();

        for(Employee emp : employees) {
            String title = emp.getJobTitle();

            if(!map.containsKey(title)) {
                map.put(title, new ArrayList<>());
            }

            map.get(title).add(emp);
        }

        return map;
    }

    public List<SalaryStats> calculateAvgSalaryByTitle(Map<String, List<Employee>> groups) {
        List<SalaryStats> stats = new ArrayList<>();

        for(String title : groups.keySet()) {

            List<Employee> employees = groups.get(title);

            double totalSalary = 0;

            for(Employee emp : employees) {
                totalSalary += emp.getSalary();
            }

            double avg = totalSalary / employees.size();

            SalaryStats stat = new SalaryStats();
            stat.setJobTitle(title);
            stat.setAverageSalary(avg);

            stats.add(stat);
        }

        return stats;
    }

}