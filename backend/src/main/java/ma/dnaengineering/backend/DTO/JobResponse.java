package ma.dnaengineering.backend.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class JobResponse {

    private Long id;
    private String title;
    private String location;
    private String description;
    private Double salary;

}
