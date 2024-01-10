package ma.dnaengineering.backend;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.math.BigDecimal;

public class JobSummary {
    @JsonProperty("jobTitle")
    private String jobTitle;

    @JsonProperty("averageSalary")
    private BigDecimal averageSalary;

    // Constructeur par défaut
    public JobSummary() {
    }

    public void setAverageSalary(BigDecimal averageSalary) {
    }

    public void setJobTitle(String jobTitle) {
    }

    // Autres méthodes et constructeurs
}
