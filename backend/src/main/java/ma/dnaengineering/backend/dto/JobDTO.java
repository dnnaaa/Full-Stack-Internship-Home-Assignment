package ma.dnaengineering.backend.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class JobDTO {
    @JsonIgnore
    private long id;
    private String title;
    private String description;
    private String location;
    private double salary;
}
