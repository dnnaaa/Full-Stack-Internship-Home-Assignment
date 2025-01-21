package ma.dnaengineering.backend.DTO;


import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class JobRequest {


    private String title;

    @NotNull(message = "Description is null !")
    private String description;

    @Min(value = 0, message = "Salary must be greater or equals 0")
    private Double salary;

    private String location;

}
