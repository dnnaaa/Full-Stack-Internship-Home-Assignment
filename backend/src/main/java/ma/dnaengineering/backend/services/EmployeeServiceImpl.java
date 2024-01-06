package ma.dnaengineering.backend.services;

import ma.dnaengineering.backend.dtos.EmployeeDto;
import ma.dnaengineering.backend.dtos.JobSummaryDto;
import ma.dnaengineering.backend.dtos.ResponseDto;
import ma.dnaengineering.backend.exceptions.NoDataFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
@Service
public class EmployeeServiceImpl implements  EmployeeService{
    @Override
    public ResponseDto processCSV(MultipartFile fileData) throws NoDataFoundException, IOException {
        if (fileData.getBytes() .length == 0) {
            throw new NoDataFoundException("No file provided. Please upload a file.");
        }
        List<EmployeeDto> employees = readFile(fileData.getBytes());
        List<JobSummaryDto> jobSummary = calculateAverageSalary(employees);
        return new ResponseDto(employees, jobSummary);
    }
    @Override
    public List<EmployeeDto> readFile(byte[] fileData) throws IOException {
        List<EmployeeDto> employees = new ArrayList<>();
        try (BufferedReader br = new BufferedReader(new InputStreamReader(new ByteArrayInputStream(fileData)))) {
            String line;
            br.readLine();
            while ((line = br.readLine()) != null) {
                String[] data = line.split(",");
                employees.add(new EmployeeDto(
                        Integer.parseInt(data[0]),
                        data[1],
                        data[2],
                        Double.parseDouble(data[3])
                ));
            }
        }catch (Exception exception){
            throw  new IOException("Error processing the file. Please try again.");
        }

        return employees;
    }
    @Override
    public  List<JobSummaryDto>calculateAverageSalary(List<EmployeeDto> employees) {
        Map<String , List<Double>> jobSalaries = new HashMap<>();
        for(EmployeeDto employeeDto: employees){
            jobSalaries.computeIfAbsent(employeeDto.getJobTitle(),k -> new ArrayList<>()).add(employeeDto.getSalary());
        }
        List<JobSummaryDto> jobSummaries = new ArrayList<>();
        DecimalFormat decimalFormat = new DecimalFormat("#.###");
        for (Map.Entry<String, List<Double>> entry: jobSalaries.entrySet()){
                String jobTitle = entry.getKey();
                List<Double> salaries = entry.getValue();
                double averageSalary = salaries.stream()
                        .mapToDouble(Double::doubleValue)
                        .average()
                        .orElse(0.0);
            String formattedAverageSalary = decimalFormat.format(averageSalary);
                jobSummaries.add(new JobSummaryDto(jobTitle, Double.parseDouble(formattedAverageSalary)));
        }
        return jobSummaries;
    }

}
