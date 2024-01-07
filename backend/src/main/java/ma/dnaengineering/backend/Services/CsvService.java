package ma.dnaengineering.backend.Services;

import ma.dnaengineering.backend.Models.Employee;

import java.io.InputStream;
import java.util.HashMap;
import java.util.List;

public interface CsvService<T> {
    /*
    I used this method to first test reading a local file
     */
    List<T> processLocalFile(String path);

    /*
     This is the method that will be used to process the file sent by the frontend app
     */
    List<T> processUploadedFile(InputStream content);


    /*
      Calculate  the average salary for each job title.
     */
    HashMap<String, Double> averageSalaryForEachJobTitle(List<T> objects);


    /*
     Stores all the CSV Data
     */
    void save(List<T> objects);

    List<T> getAll();
}
