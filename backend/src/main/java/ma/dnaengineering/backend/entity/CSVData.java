package ma.dnaengineering.backend.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Builder @Data
@AllArgsConstructor @NoArgsConstructor
public class CSVData {
    private Map<String, List<Employee>> employeesByJobTitle;
}
