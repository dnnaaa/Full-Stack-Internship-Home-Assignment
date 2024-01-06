package ma.dnaengineering.backend.models;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.NonNull;

@Builder
public record Employee(
        @Min(0)
        long id,
        @NotBlank
        String name,
        @NotBlank
        String jobTitle,
        @NonNull @Min(0)
        Double salary
){}
