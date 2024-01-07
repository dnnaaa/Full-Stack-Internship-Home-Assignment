package ma.dnaengineering.backend.beans;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
@Data
@NoArgsConstructor @AllArgsConstructor
public class FileData implements Serializable {
    private int id;
    private String employeeName;
    private String jobTitle;
    private double salary;

}
