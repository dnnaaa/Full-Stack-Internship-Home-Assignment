package ma.dnaengineering.backend.services.impl;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import ma.dnaengineering.backend.entitys.Employee;
import ma.dnaengineering.backend.services.FileService;

@Service
public class FileServiceImpl implements FileService {

	public FileServiceImpl() {
		// TODO Auto-generated constructor stub
	}

	@Override
	public List<Employee> readFile(MultipartFile file) throws IOException {
		// TODO Auto-generated method stub

		List<Employee> employees = new ArrayList<>();

		try (BufferedReader br = new BufferedReader(new InputStreamReader(file.getInputStream()))) {
			String line;
			int temp = 0;
			while ((line = br.readLine()) != null) {
				if (temp != 0) {

					String[] values = line.split(",");
					Employee employee = new Employee(Long.parseLong(values[0]), values[1], values[2],
							Double.parseDouble(values[3]));

					employees.add(employee);
				}
				temp++;
			}

		}

		return employees;
	}

	public Map<String, Double> calculateAverageSalaryByJobTitle(List<Employee> employees) {
		return employees.stream()
				.collect(Collectors.groupingBy(Employee::getJobTitle, Collectors.averagingDouble(Employee::getSalary)));
	}

}
