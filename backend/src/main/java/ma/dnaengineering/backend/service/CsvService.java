package ma.dnaengineering.backend.service;

import ma.dnaengineering.backend.bo.Employee;
import ma.dnaengineering.backend.web.CsvResponse;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class CsvService implements ICsvService{

	@Override
	public CsvResponse getDataFromCsv(MultipartFile multipartFile) throws IOException {
		List<Employee> employeeList = new ArrayList<>();

		InputStreamReader inputStreamReader = new InputStreamReader(multipartFile.getInputStream());
		BufferedReader bufferedReader = new BufferedReader(inputStreamReader);
		String fileLine;

		//populate the employee list from the csv file
		while ((fileLine = bufferedReader.readLine()) != null) {
			if (fileLine.startsWith("id")) {
				continue;
			}

			String[] employeeArr = fileLine.split(",");

			String id = employeeArr[0];
			String employee_name = employeeArr[1];
			String job_title = employeeArr[2];
			String salary = employeeArr[3];

			Employee newEmployee = new Employee(Long.parseLong(id), employee_name, job_title, Double.parseDouble(salary));
			employeeList.add(newEmployee);
		}

		//setting the list of employee and jobSummary map for the response
		CsvResponse csvResponse = new CsvResponse(employeeList,getJobSummary(employeeList));

		return csvResponse;
	}

	//populate the jobs summary map from the list of employee
	private static Map<String, Double> getJobSummary(List<Employee> employeeList) {
		Map<String,Double> jobSummary = new HashMap<>();

		//loop through the employee list to get jobs title and calculate the average salary
		for(Employee emp : employeeList){
			String jobTitle = emp.getJob_title();
			//skip this process if the jobSummary map already contains this job
			if(jobSummary.containsKey(jobTitle)) continue;

			int count = 0;
			double salarySum = 0;

			//looping over all the employee to check similar jobs title and then increment count and the sum of salary
			for(Employee e : employeeList){
				if(jobTitle.equals(e.getJob_title())){
					count++;
					salarySum += e.getSalary();
				}
			}

			//calculate the average for this job and add it to map
			double avgSalary = salarySum/count;
			jobSummary.put(emp.getJob_title(), avgSalary);
		}
		return jobSummary;
	}
}
