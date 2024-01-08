package ma.dnaengineering.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
// j'ecrit ca pour vision les deux table employees et jobs
@Data
@NoArgsConstructor
@AllArgsConstructor
public class FileProcessingResult {
    private List<Employee> employees;
    private List<Job> jobs;



}
