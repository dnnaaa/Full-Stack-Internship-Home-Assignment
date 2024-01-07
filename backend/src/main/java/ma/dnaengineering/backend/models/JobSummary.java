package ma.dnaengineering.backend.models;

import jakarta.persistence.Entity;


public class JobSummary {

    private String jobTitle;
    private double averageSalary;

    public JobSummary() {
        // Default constructor for Jackson (used in JSON serialization/deserialization)
    }

    public JobSummary(String jobTitle, double averageSalary) {
        this.jobTitle = jobTitle;
        this.averageSalary = averageSalary;
    }

    // Getters and Setters

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
