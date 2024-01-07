package ma.dnaengineering.backend.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;


import ma.dnaengineering.backend.Entities.Employee;

@Service

public class EmployeeServiceImpl implements EmployeeService {

    private List<Employee> employees=new ArrayList<>();



    @Override
    public void readCSV(InputStream inputStream) {

        try (BufferedReader bufferedReader=new BufferedReader(new InputStreamReader(inputStream))){

            
            String Line;
            boolean isFirstLine=true;

            while ((Line=bufferedReader.readLine()) !=null) {

                if(isFirstLine){
                    isFirstLine=false;
                    continue;
                }

                String[] fields=Line.split(",");

                for(int i=0;i<fields.length;i++){

                    fields[i]=fields[i].trim();
                }

                Long Id=Long.parseLong(fields[0]);
                String name=fields[1];
                String job_title=fields[2];
                double salary=Double.parseDouble(fields[3]);

                Employee employee=new Employee(Id, name, job_title, salary);

                employees.add(employee);

                
            }
        } catch (IOException | NumberFormatException e){

            e.printStackTrace();
        }
        
    }


     @Override
    public List<Employee> getEmployees(int page, int pageSize) {

        int startIndex =page*pageSize;
        int endIndex =Math.min(startIndex+pageSize,employees.size());


        if(startIndex>=endIndex || startIndex<0 || endIndex<0){
            return Collections.emptyList();

        }

        return employees.subList(startIndex, endIndex);
        
    }

    @Override
    public Map<String, Double> calculateAverageSlaryByJobTitle(int page, int pageSize) {

         int startIndex =page*pageSize;
        int endIndex =Math.min(startIndex+pageSize,employees.size());


        if(startIndex>=endIndex || startIndex<0 || endIndex<0){
            return Collections.emptyMap();

        }

        Map<String, Double> summary=new HashMap<>();

        for(int i=startIndex;i<endIndex;i++){

            Employee employee=employees.get(i);
            String jobTitle=employee.getJob_title();
            double salary=employee.getSalary();


            summary.merge(jobTitle, salary, Double::sum);

        }
        summary.replaceAll((key,value)-> value/pageSize);
       
        throw new UnsupportedOperationException("Unimplemented method 'calculateAverageSlaryByJobTitle'");
    }

    
    
}
