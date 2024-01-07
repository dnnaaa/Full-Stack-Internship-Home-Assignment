package ma.dnaengineering.backend.Services;

import ma.dnaengineering.backend.Models.Employee;
import ma.dnaengineering.backend.Repositories.EmployeeRepository;
import ma.dnaengineering.backend.Utils.FileReader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.InputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class CsvServiceImp implements CsvService<Employee>{
     private EmployeeRepository repository ;

     @Autowired
     public CsvServiceImp (EmployeeRepository repository) {
         this.repository = repository;
     }

    @Override
    public List<Employee> processLocalFile(String path) {
        return FileReader.readFileByLine(path)
                .stream()
                .skip(1)
                .map(this::csvLineToEmployee)
                .collect(Collectors.toList());
    }

    @Override
    public List<Employee> processUploadedFile(InputStream content) {
        return FileReader.readSentFileByLine(content)
                .stream()
                .skip(1)
                .map(this::csvLineToEmployee)
                .collect(Collectors.toList());
    }

    @Override
    public HashMap<String, Double> averageSalaryForEachJobTitle(List<Employee> employees) {
        HashMap<String , Double> summary = new HashMap<>();
        HashMap<String , Integer> job_count_map = new HashMap<>();
        Double salary_sum=0.d ;
        Integer job_count_sum = 0;

        // Calculate the total salary and total count of each job title
        for (Employee e : employees) {
            String job_title = e.getJob_title();
            Double salary = e.getSalary();

           if(summary.get(job_title) == null ){
               summary.put(job_title,salary);
                job_count_map.put(job_title,1);
            }else {
             salary_sum = summary.get(job_title) + salary;
             job_count_sum = job_count_map.get(job_title) + 1 ;
             summary.replace(job_title,(salary_sum));
             job_count_map.replace(job_title,job_count_sum);
            }
        }

        // Calculate the average
        for(Map.Entry<String,Double> entry : summary.entrySet()) {
            String job_title = entry.getKey();
            Double total_salary = entry.getValue();
            int  job_total_count = job_count_map.get(job_title);

            summary.put(job_title, (total_salary/job_total_count) );
        }


        return summary;
    }

    @Override
    public void save(List<Employee> employees) {
        repository.saveAll(employees);
    }

    @Override
    public List<Employee> getAll() {
        return repository.findAll();
    }


    /*
    Converts a line in the csv file to an employee object
     */
    private Employee csvLineToEmployee(String line ) {
        String[] values = line.split(",");
        return Employee.builder()
                .id(Integer.parseInt(values[0]))
                .employee_name(values[1])
                .job_title(values[2])
                .salary(Double.parseDouble(values[3]))
                .build();

    }
}
