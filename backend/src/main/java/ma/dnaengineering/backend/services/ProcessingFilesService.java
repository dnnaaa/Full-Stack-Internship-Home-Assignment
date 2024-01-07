package ma.dnaengineering.backend.services;

import com.opencsv.CSVReader;
import com.opencsv.CSVReaderBuilder;
import com.opencsv.exceptions.CsvException;
import ma.dnaengineering.backend.DTO.EmployeXavgSalary;
import ma.dnaengineering.backend.models.Employe;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ProcessingFilesService {
    public List<Employe> getEmployees(InputStream employeesFile) throws IOException, CsvException {
            Reader fileReader = new InputStreamReader(employeesFile);
            CSVReader csvReader = new CSVReaderBuilder(fileReader).build();
            List<String[]> rows = csvReader.readAll();
            rows.remove(0);
            List<Employe> employees = new ArrayList<>();
            for (String[] s : rows){
                employees.add(new Employe(Integer.parseInt(s[0]),s[1],s[2],Double.parseDouble(s[3])));
            }
            return employees;
    }
    public ResponseEntity<Object> getEmployeesFromCSV(MultipartFile employeesFile) {
        try{
            List<Employe> employees = this.getEmployees(employeesFile.getInputStream());
            Map<String,Object> response = new HashMap<>();
            response.put("employees",employees);
            System.out.printf("employeé",employees.size());
            response.put("avgSalary",this.getEmployeesAverageSalary(employees));
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (IOException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.CONFLICT);
        } catch (CsvException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.CONFLICT);
        }
    }
    public Map<String,Double> getEmployeesAverageSalary(List<Employe> employees) {
        Map<String ,Integer> avgJobTitle = new HashMap<>();
        Map<String,Double> empAvgSalary = new HashMap<>();
        for (Employe emp : employees ){
            if(avgJobTitle.containsKey(emp.getJobTitle())){
                avgJobTitle.put(emp.getJobTitle(),avgJobTitle.get(emp.getJobTitle()) + 1);
            }
            else avgJobTitle.put(emp.getJobTitle(),1);
        }
        for (Employe emp : employees ){
            if(empAvgSalary.containsKey(emp.getJobTitle())){
                double oldAvgSal = empAvgSalary.get(emp.getJobTitle());
                double newAvgSal = oldAvgSal + emp.getSalary() / avgJobTitle.get(emp.getJobTitle());
                empAvgSalary.put(emp.getJobTitle(),newAvgSal);
            }else{
                empAvgSalary.put(emp.getJobTitle(),emp.getSalary() / avgJobTitle.get(emp.getJobTitle()));
            }
        }
        return empAvgSalary;
    }
}
