package ma.dnaengineering.backend.models;

import java.util.List;

public class DataWrapper {
    private List<Employee> employees;
    private List<Job> jobs;

    // Constructors, getters, and setters

    public DataWrapper(List<Employee> employees, List<Job> jobs) {
        this.employees = employees;
        this.jobs = jobs;
    }

    public List<Employee> getEmployees() {
        return employees;
    }

    public void setEmployees(List<Employee> employees) {
        this.employees = employees;
    }

    public List<Job> getJobs() {
        return jobs;
    }

    public void setJobs(List<Job> jobs) {
        this.jobs = jobs;
    }
}
