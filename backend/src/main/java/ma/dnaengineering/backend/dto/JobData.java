package ma.dnaengineering.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class JobData {
    private Long id;
    private String title;
    private String description;
    private String location;
    private Double salary;
    private Timestamp postedAt;
    private Timestamp updatedAt;
}
