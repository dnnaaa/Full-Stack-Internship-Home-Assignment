package ma.dnaengineering.backend.services;

import ma.dnaengineering.backend.entities.EmployeEntity;
import ma.dnaengineering.backend.entities.ParserEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ParserService {

	public Map<String, Object> processCsv(MultipartFile file) throws IOException {
		
		List<ParserEntity> csvDataList = parseCsv(file);

		List<EmployeEntity> employees = processRows(csvDataList);

		Map<String, Double> averageSalaries = calculateAverageSalaries(employees);

		return Map.of("employees", employees, "averageSalaries", averageSalaries);
	}

	public List<ParserEntity> parseCsv(MultipartFile file) throws IOException {
		
		List<ParserEntity> csvDataList = new ArrayList<>();

		try (BufferedReader reader = new BufferedReader(new InputStreamReader(file.getInputStream()))) {
			//je peut eviter le header
			String header = reader.readLine();

			String line;
			while ((line = reader.readLine()) != null) {
				String[] data = line.split(",");
				ParserEntity csvData = new ParserEntity();
				csvData.setId(data[0].trim());
				csvData.setEmployeeName(data[1].trim());
				csvData.setJobTitle(data[2].trim());
				csvData.setSalary(Double.parseDouble(data[3].trim()));
				csvDataList.add(csvData);
			}
		}
		return csvDataList;
	}

	public List<EmployeEntity> processRows(List<ParserEntity> csvDataList) {
		return csvDataList.stream().map(parserEntity -> new EmployeEntity(parserEntity.getId(),
				parserEntity.getEmployeeName(), parserEntity.getJobTitle(), parserEntity.getSalary()))
				.collect(Collectors.toList());
	}

	public Map<String, Double> calculateAverageSalaries(List<EmployeEntity> employees) {
		return employees.stream().collect(Collectors.groupingBy(EmployeEntity::getJobTitle,
				Collectors.averagingDouble(EmployeEntity::getSalary)));
	}
}
