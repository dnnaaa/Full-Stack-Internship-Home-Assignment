package ma.dnaengineering.backend.DTO;

public class Employee {
    private Long id;
    private String employeeName;
    private String jobTitle;
    private double salary;


    public Employee() {

    }

    public Employee(Long id, String employeeName, String jobTitle, double salary) {
        this.id = id;
        this.employeeName = employeeName;
        this.jobTitle = jobTitle;
        this.salary = salary;
    }



    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmployeeName() {
        return employeeName;
    }

    public void setEmployeeName(String employeeName) {
        this.employeeName = employeeName;
    }

    public String getJobTitle() {
        return jobTitle;
    }

    public void setJobTitle(String jobTitle) {
        this.jobTitle = jobTitle;
    }

    public double getSalary() {
        return salary;
    }

    public void setSalary(double salary) {
        this.salary = salary;
    }




}

