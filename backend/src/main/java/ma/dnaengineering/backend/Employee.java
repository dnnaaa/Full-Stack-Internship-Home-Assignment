package ma.dnaengineering.backend;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Employee {

    private int id;
    private String employee_name;
    private String job_title;
    private double salary;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getEmployee_name() {
        return employee_name;
    }

    public void setEmployee_name(String employee_name) {
        this.employee_name = employee_name;
    }

    public String getJob_title() {
        return job_title;
    }

    public void setJob_title(String job_title) {
        this.job_title = job_title;
    }

    public double getSalary() {
        return salary;
    }

    public void setSalary(double salary) {
        this.salary = salary;
    }

    public Employee(int id, String employee_name, String job_title, double salary) {
        this.id = id;
        this.employee_name = employee_name;
        this.job_title = job_title;
        this.salary = salary;
    }

    @Override
    public String toString() {
        return "Employee{" +
                "id=" + id +
                ", employee_name='" + employee_name + '\'' +
                ", job_title='" + job_title + '\'' +
                ", salary=" + salary +
                '}';
    }
}
