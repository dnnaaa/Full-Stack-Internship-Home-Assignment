package ma.dnaengineering.backend.strategy;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class SimpleCSVParser implements CSVParserStrategy {

    private static final char DEFAULT_SEPARATOR = ',';
    private static final char DEFAULT_QUOTE = '"';

    @Override
    public List<String[]> parse(String csvData) {
        List<String[]> lines = new ArrayList<>();
        if (csvData != null && !csvData.isEmpty()) {
            boolean inQuotes = false;
            StringBuilder field = new StringBuilder();
            List<String> line = new ArrayList<>();

            for (int i = 0; i < csvData.length(); i++) {
                char c = csvData.charAt(i);

                if (c == DEFAULT_QUOTE) {
                    // Toggle inQuotes when encountering a quote
                    inQuotes = !inQuotes;
                } else if (c == DEFAULT_SEPARATOR && !inQuotes) {
                    // Add field to line when not inQuotes and encountering a comma
                    line.add(field.toString());
                    field.setLength(0); // Clear the field buffer
                } else if ((c == '\r' && i + 1 < csvData.length() && csvData.charAt(i + 1) == '\n') ||
                        c == '\n') {
                    // Handle line break for "\r\n" or "\n"
                    line.add(field.toString());
                    lines.add(line.toArray(new String[0]));
                    line.clear();
                    field.setLength(0); // Clear the field buffer
                    if (c == '\r') {
                        i++; // Increment i to skip '\n'
                    }
                } else {
                    field.append(c);
                }
            }

            // Add the last field to the line
            line.add(field.toString());
            lines.add(line.toArray(new String[0]));
        }
        return lines;
    }

}
