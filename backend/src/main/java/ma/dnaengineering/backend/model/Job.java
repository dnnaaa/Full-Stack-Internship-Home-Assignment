package ma.dnaengineering.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class Job {
    private String title;
    private double average;
    public Job(String title){
        this.title = title;
    }
}
