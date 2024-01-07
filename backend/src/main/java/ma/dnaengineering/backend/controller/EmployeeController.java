package ma.dnaengineering.backend.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import ma.dnaengineering.backend.Entity.Employee;
import ma.dnaengineering.backend.Service.EmployeeServiceImp;
import ma.dnaengineering.backend.error.ResponseMessage;

@RestController
public class EmployeeController {
	
	@Autowired
	EmployeeServiceImp employeeService;

	
	//read and process the csv file
	 @PostMapping("/uploadcsv")
	public ResponseEntity<ResponseMessage> uploadCSV(@RequestParam("file") MultipartFile file) {
	  if(employeeService.hasCsvFileFormat(file)) {
			employeeService.processAndSaveData(file);
		  return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage("upload the file succesfully"+file.getOriginalFilename()));
			 
		}
	     return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new ResponseMessage("Please upload csv file"));
	 }
	
	//API for Employee information
		@GetMapping("/employeeInformation")
		public List<Employee> fetchEmployeeList(){
			return employeeService.fetchEmployeeList();
			
		}

	//API for jobs summary
		
		@GetMapping("/jobsSummary")
		public List<Map<String,Double>> fetchaverage(){
				return employeeService.getAverageSalary();
				
	     }
	

}
