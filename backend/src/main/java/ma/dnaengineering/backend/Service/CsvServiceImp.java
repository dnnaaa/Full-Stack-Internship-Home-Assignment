package ma.dnaengineering.backend.Service;

import ma.dnaengineering.backend.Entity.Employee;
import ma.dnaengineering.backend.Repository.EmployeeRepository;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.util.ArrayList;
import java.util.List;

@Service
public class CsvServiceImp implements CsvService{

    @Autowired
    private EmployeeRepository employeeRepository;
    @Override
    public boolean hasCsvFormat(MultipartFile csvfile) {
        String type="text/csv";
        if(!type.equals(csvfile.getContentType()))
            return false;
        return true;
    }


    @Override
    public void processAndSaveData(MultipartFile csvfile) {
        try{
            List<Employee> employees=csvtoEmployees(csvfile.getInputStream());
            employeeRepository.saveAll(employees);
        } catch (IOException e){
            e.printStackTrace();
        }

    }

    private List<Employee> csvtoEmployees(InputStream inputStream) {
        try(BufferedReader fileReader=new BufferedReader(new InputStreamReader(inputStream,"UTF-8"));
            CSVParser csvparser =new CSVParser(fileReader,
                    CSVFormat.DEFAULT.withFirstRecordAsHeader().withIgnoreHeaderCase().withTrim());
        ){
            List<Employee> employees=new ArrayList<Employee>();
            List<CSVRecord> records=csvparser.getRecords();
            for(CSVRecord csvRecord : records){
                Employee employee = new Employee(Integer.parseInt(csvRecord.get("id")),csvRecord.get("employee_name"),csvRecord.get("job_title"),
                        Double.parseDouble(csvRecord.get("salary")));
                employees.add(employee);

            }
            return employees;
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

}
