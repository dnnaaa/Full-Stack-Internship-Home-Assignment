package ma.dnaengineering.backend.models;

public class Employe {
    int id;
    String employeeName;
    String jobTitle;
    double salary;

    public Employe(int id, String employeeName, String jobTitle, double salary) {
        this.id = id;
        this.employeeName = employeeName;
        this.jobTitle = jobTitle;
        this.salary = salary;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
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
