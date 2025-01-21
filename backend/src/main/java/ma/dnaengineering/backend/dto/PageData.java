package ma.dnaengineering.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PageData {
    private boolean hasNext;
    private boolean hasPrevious;
    private List<JobData> content;
    private long number;
    private int size;
    private long totalElements;
}
