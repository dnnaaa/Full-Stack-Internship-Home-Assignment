package ma.dnaengineering.backend.parser;

import ma.dnaengineering.backend.model.Employee;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

public interface CsvParser {

    List<Employee> parseCsv(InputStream inputStream) throws IOException;


}
