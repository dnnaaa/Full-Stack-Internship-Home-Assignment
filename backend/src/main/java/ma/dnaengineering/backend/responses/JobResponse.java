package ma.dnaengineering.backend.responses;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class JobResponse {

    private long id;
    private String title;
    private double salary;
    private String location;

}
