package ma.dnaengineering.backend.service;

import ma.dnaengineering.backend.entity.Employee;
import ma.dnaengineering.backend.repository.EmployeeRepository;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class FileServiceImpl implements FileService {

    @Autowired
    private EmployeeRepository repository;
    @Override
    public boolean hasCsvFormat(MultipartFile file){
        String type = "text/csv";
        if(!type.equals(file.getContentType()))
            return false;
        return true;
    }

    @Override
    public void processAndSaveData(MultipartFile file) {
        try {
            List<Employee> employees = csvToEmployees(file.getInputStream());
            if(!employees.isEmpty()){
                repository.saveAll(employees);
                System.out.println("Données sauvegardées avec succès !");
                //processEmployeeData();
            }else {
                System.out.println("La liste est vide.");
            }
        } catch (IOException e) {
            e.printStackTrace();
            System.err.println("Erreur lors du traitement du fichier CSV : " + e.getMessage());
        }catch (Exception ex) {
            ex.printStackTrace();
            System.err.println("Une erreur inattendue s'est produite : " + ex.getMessage());
        }

    }

    @Override
    public List<Employee> getAllEmployees() {
        return repository.findAll();
    }

    private List<Employee> csvToEmployees(InputStream inputStream) {
        try (BufferedReader fileReader = new BufferedReader( new InputStreamReader(inputStream, "UTF-8"));
             CSVParser csvParser = new CSVParser(fileReader,
                     CSVFormat.DEFAULT.withFirstRecordAsHeader().withIgnoreHeaderCase().withTrim());
        ){
            List< Employee> employees = new ArrayList<Employee>();
            List<CSVRecord> records = csvParser.getRecords();
            for(CSVRecord csvRecord : records){
                Employee employee = new Employee(Long.parseLong(csvRecord.get("id")), csvRecord.get("employee_name") ,csvRecord.get("job_title") ,csvRecord.get("salary"));
                employees.add(employee);
            }
            return employees;
        } catch (IOException e){
            e.printStackTrace();
        }

        return null;
    }

    @Override
    public List<Map.Entry<String, Double>> getAverageSalariesByJobTitle() {
        List<Employee> allEmployees = repository.findAll();

        Map<String, Double> averageSalariesByJobTitle = new HashMap<>();

        for (Employee employee : allEmployees) {
            String jobTitle = employee.getJob_title();
            double salary = Double.parseDouble(employee.getSalary());
            averageSalariesByJobTitle.merge(jobTitle, salary, (oldSalary, newSalary) -> (oldSalary + newSalary) / 2);
        }

        return new ArrayList<>(averageSalariesByJobTitle.entrySet());
    }
}
