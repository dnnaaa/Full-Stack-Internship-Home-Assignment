package ma.dnaengineering.backend.requests;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class JobRequest {

    @NotBlank(message = "Title is required and cannot be blank.")
    private String title;

    @NotBlank(message = "Description is required and cannot be blank.")
    private String description;

    @Positive(message = "Salary must be a positive number.")
    private Double salary;

    private String location;

}
