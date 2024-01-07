package ma.dnaengineering.backend.service;

import ma.dnaengineering.backend.entities.Employee;

import java.io.InputStream;
import java.util.List;

public interface CSVService {

    public List<String[]> readCSV(InputStream inputStream);
    public void processRecords(List<String[]> records);
}
