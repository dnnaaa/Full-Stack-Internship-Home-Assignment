package ma.dnaengineering.backend.models;

public class Job {
    private String jobTitle;
    private double averageSalary;

    public Job(String jobTitle, double averageSalary) {
        this.jobTitle = jobTitle;
        this.averageSalary = averageSalary;
    }

    public String getJobTitle() {
        return jobTitle;
    }

    public void setJobTitle(String jobTitle) {
        this.jobTitle = jobTitle;
    }

    public double getAverageSalary() {
        return averageSalary;
    }

    public void setAverageSalary(double averageSalary) {
        this.averageSalary = averageSalary;
    }
}
