package ma.dnaengineering.backend.Entities;


import lombok.Data;

@Data
public class Employee {


    private Long Id;
    private String name;
    private String job_title;
    private double salary;



    public Employee(Long Id,String name,String job_title,double salary){

        this.Id=Id;
        this.name=name;
        this.job_title=job_title;
        this.salary=salary;
    }


    
}
