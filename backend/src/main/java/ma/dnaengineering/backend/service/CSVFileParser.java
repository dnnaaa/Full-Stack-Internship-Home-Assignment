package ma.dnaengineering.backend.service;

import ma.dnaengineering.backend.strategy.CSVParserStrategy;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CSVFileParser {
    private CSVParserStrategy parser;

    public CSVFileParser(CSVParserStrategy parser) {
        this.parser = parser;
    }

    public List<String[]> parseCSV(String csvData) {
        return parser.parse(csvData);
    }
}
