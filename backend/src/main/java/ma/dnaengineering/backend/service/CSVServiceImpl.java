package ma.dnaengineering.backend.service;

import lombok.AllArgsConstructor;
import ma.dnaengineering.backend.entities.Employee;

import com.opencsv.CSVReader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;

@Service
@AllArgsConstructor
public class CSVServiceImpl implements CSVService {

    @Autowired
    private EmployeeService employeeService;

    private static final Logger LOGGER = Logger.getLogger(CSVServiceImpl.class.getName());
    private static final int THREAD_POOL_SIZE = 4;

    @Override
    public List<String[]> readCSV(InputStream inputStream) {
        List<String[]> records;
        try (CSVReader csvReader = new CSVReader(new BufferedReader(new InputStreamReader(inputStream)))) {
            // read first line (header)
            csvReader.readNext();
            // read the data of the employees
            records = csvReader.readAll();
        } catch (Exception e) {
            throw new RuntimeException("Error reading CSV data", e);
        }
        return records;
    }

    @Override
    public void processRecords(List<String[]> records) {
        ExecutorService executorService = Executors.newFixedThreadPool(THREAD_POOL_SIZE);
        List<Future<?>> futures = new ArrayList<>();

        for (String[] record : records) {
            futures.add(executorService.submit(() -> {
                if (record.length == 4) {
                    try {
                        long id = Long.parseLong(record[0]);
                        String employeeName = record[1];
                        String jobTitle = record[2];
                        Double salary = Double.parseDouble(record[3]);
                        Employee employee = Employee.builder()
                                .id(id)
                                .employeeName(employeeName)
                                .jobTitle(jobTitle)
                                .salary(salary)
                                .build();
                        synchronized (this) {
                            employeeService.add(employee);
                        }
                    } catch (NumberFormatException e) {
                        LOGGER.log(Level.WARNING, "Invalid number format in record: " + String.join(",", record), e);
                    }
                } else {
                    LOGGER.log(Level.WARNING, "Invalid record: " + String.join(",", record));
                }
            }));
        }

        for (Future<?> future : futures) {
            try {
                future.get();
            } catch (Exception e) {
                LOGGER.log(Level.SEVERE, "Error processing record", e);
            }
        }
        executorService.shutdown();
    }
}
