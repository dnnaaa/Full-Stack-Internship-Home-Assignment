package ma.dnaengineering.backend.strategy;

import java.util.List;

public interface CSVParserStrategy {
    List<String[]> parse(String csvData);
}
