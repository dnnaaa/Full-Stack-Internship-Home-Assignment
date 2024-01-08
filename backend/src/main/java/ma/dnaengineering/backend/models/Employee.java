package ma.dnaengineering.backend.models;

public class Employee {
    public  Long id ;
    public String name;
    public String jobTitle ;
    public Double salary;

    public Employee(Long id, String name, String jobTitle, Double salary) {
        this.id = id;
        this.name = name;
        this.jobTitle = jobTitle;
        this.salary = salary;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getJobTitle() {
        return jobTitle;
    }

    public void setJobTitle(String jobTitle) {
        this.jobTitle = jobTitle;
    }

    public Double getSalary() {
        return salary;
    }

    public void setSalary(Double salary) {
        this.salary = salary;
    }

    @Override
    public String toString()  {
        return "{ "+id+", "+name+", "+jobTitle+", "+salary+"}";
    }
}
