package ma.dnaengineering.backend.controllers;

import ma.dnaengineering.backend.dto.ReportRequest;
import ma.dnaengineering.backend.dto.ReportResponse;
import ma.dnaengineering.backend.entities.Employee;
import ma.dnaengineering.backend.entities.SalaryStats;
import ma.dnaengineering.backend.services.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import ma.dnaengineering.backend.utils.CsvParser;

import java.util.List;
import java.util.Map;
import java.util.logging.Level;

@CrossOrigin(origins = "*")
@RestController
public class ReportController {
    @Autowired
    private ReportService reportService;
    @PostMapping("/report")
    public ReportResponse uploadReport(ReportRequest request) {

        List<Employee> employees = CsvParser.parse(request.getCsvFile());
        System.out.println(employees.get(0).getId());
        Map<String, List<Employee>> employeesByTitle = reportService.groupEmployeesByTitle(employees);

        List<SalaryStats> salaryStats = reportService.calculateAvgSalaryByTitle(employeesByTitle);

        ReportResponse reportResponse = new ReportResponse();
        reportResponse.setEmployees(employees); // paginated
        reportResponse.setSalaryStats(salaryStats);

        return reportResponse;
    }
}
