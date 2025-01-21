package ma.dnaengineering.backend.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class JobDto {

    private String title;
    private String description;
    private String location;
    private BigDecimal salary;

}

