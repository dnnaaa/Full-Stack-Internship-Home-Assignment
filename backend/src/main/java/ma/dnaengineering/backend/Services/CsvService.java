package ma.dnaengineering.backend.Services;

import ma.dnaengineering.backend.Models.Employe;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class CsvService {

    public List<Employe> parseCsv(String filePath) throws IOException {
        List<Employe> employes = new ArrayList<>();

        try (BufferedReader br = new BufferedReader(new FileReader(filePath))) {
            // Skip the header
            br.readLine();

            String line;
            while ((line = br.readLine()) != null) {
                String[] data = line.split(",");
                Employe employe = new Employe(Integer.parseInt(data[0]), data[1], data[2], Double.parseDouble(data[3]));
                employes.add(employe);
            }
        }

        return employes;
    }


    public Map<String, Double> calculateAverageSalary(List<Employe> employees) {
        Map<String, List<Double>> jobTitleSalaries = new HashMap<>();

        for (Employe employee : employees) {
            jobTitleSalaries.computeIfAbsent(employee.getJobTitle(), k -> new ArrayList<>()).add(employee.getSalary());
        }

        Map<String, Double> averageSalaries = new HashMap<>();
        for (Map.Entry<String, List<Double>> entry : jobTitleSalaries.entrySet()) {
            double averageSalary = entry.getValue().stream().mapToDouble(Double::doubleValue).average().orElse(0.0);
            averageSalaries.put(entry.getKey(), averageSalary);
        }

        return averageSalaries;
    }
}
