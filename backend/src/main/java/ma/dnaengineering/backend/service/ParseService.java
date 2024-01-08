package ma.dnaengineering.backend.service;

import com.opencsv.CSVReader;
import com.opencsv.exceptions.CsvValidationException;
import ma.dnaengineering.backend.model.Employee;
import ma.dnaengineering.backend.model.Job;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ParseService {
    public List<String[]> readFileCsv(MultipartFile file) throws IOException {
        List<String[]> list = new ArrayList<>();
        try (InputStream inputStream = file.getInputStream();
             Reader reader = new BufferedReader(new InputStreamReader(inputStream));
             CSVReader csvReader = new CSVReader(reader)) {

            String[] line;
            while ((line = csvReader.readNext()) != null) {
                list.add(line);
            }

        } catch (CsvValidationException | IOException e) {
            throw new RuntimeException(e);
        }
        return list;
    }
    public List<Employee> getEmployees(MultipartFile file, int page, int pageSize) throws IOException {
        List<String[]> data = this.readFileCsv(file);
        List<Employee> employees= new ArrayList<>();
        for (int i=1;i<data.size();i++) {
            String[] line = data.get(i);
            int id = Integer.parseInt(line[0]);
            String name = line[1];
            Job job = new Job(line[2]);
            double salary = Double.parseDouble(line[3]);
            Employee employee = new Employee(id, name, job, salary);
            employees.add(employee);
        }
        int startIndex = page * pageSize;
        int endIndex = Math.min(startIndex + pageSize, employees.size());
        return employees.subList(startIndex, endIndex);
    }
    public List<Job> getJobs(MultipartFile file) throws IOException {
        List<String[]> data = this.readFileCsv(file);

        Map<String, JobStatistics> jobStatisticsMap = data.stream()
                .skip(1) // Skip header of the csv
                .collect(Collectors.groupingBy(
                        line -> line[2], // Group by job title
                        Collectors.collectingAndThen(
                                Collectors.summarizingDouble(line -> Double.parseDouble(line[3])),
                                summary -> new JobStatistics(summary.getSum(), summary.getCount()) // calculate and create JobStatistics
                        )
                ));

        return jobStatisticsMap.entrySet().stream()
                .map(entry -> new Job(entry.getKey(), entry.getValue().getAverageSalary()))
                .collect(Collectors.toList());
    }

    private static class JobStatistics {
        private final double totalSalary;
        private final long jobCount;

        public JobStatistics(double totalSalary, long jobCount) {
            this.totalSalary = totalSalary;
            this.jobCount = jobCount;
        }

        public double getAverageSalary() {
            return totalSalary / jobCount;
        }
    }

}
