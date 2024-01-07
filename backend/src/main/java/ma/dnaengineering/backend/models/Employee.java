package ma.dnaengineering.backend.models;

import jakarta.persistence.Entity;


public class Employee {
    private Long id;
    //id,employee_name,job_title,salary
    private String employee_name;
    private String job_title;
    private Double salary;

    public Employee(Long id, String employee_name, String job_title, Double salary) {
        this.id = id;
        this.employee_name = employee_name;
        this.job_title = job_title;
        this.salary = salary;
    }

    public Long getId() {
        return id;
    }

    public String getEmployee_name() {
        return employee_name;
    }

    public String getJob_title() {
        return job_title;
    }

    public Double getSalary() {
        return salary;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setEmployee_name(String employee_name) {
        this.employee_name = employee_name;
    }

    public void setJob_title(String job_title) {
        this.job_title = job_title;
    }

    public void setSalary(Double salary) {
        this.salary = salary;
    }
}

