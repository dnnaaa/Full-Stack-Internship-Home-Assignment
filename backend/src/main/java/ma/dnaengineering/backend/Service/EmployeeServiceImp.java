package ma.dnaengineering.backend.Service;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.swing.plaf.multi.MultiFileChooserUI;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.util.Pair;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;



import ch.qos.logback.core.rolling.helper.FileStoreUtil;
import ma.dnaengineering.backend.Entity.Employee;
import ma.dnaengineering.backend.Repository.EmployeeRepository;

@Service
public class EmployeeServiceImp implements EmployeeService{
	
	@Autowired
	EmployeeRepository employeeRepository;
	
	
	
	//Display Employee information,
    @Override
	public List<Employee> fetchEmployeeList() {
		// TODO Auto-generated method stub
		return employeeRepository.findAll();
	}
    
    //Display Jobs summary
    @Override
    public List<Map<String,Double>> getAverageSalary(){
    	return employeeRepository.getJobTitleAverageSalaries();
    }
    
    //Check if the file type is CSV.
    @Override
	public boolean hasCsvFileFormat(MultipartFile file) {
		String type="text/csv";
		if(!type.equals(file.getContentType())) {
			return false;
		}
		return true;
	}
    
    @Override
	public void processAndSaveData(MultipartFile file) {
		
		try {
			List<Employee> employeeList=csvToEmployee(file.getInputStream());
			employeeRepository.saveAll(employeeList);
		} catch (IOException e) {
		
			e.printStackTrace();
		}
	}

  //Save the data from the file to the database
	public List<Employee> csvToEmployee(InputStream inputStream) {
		try(
			BufferedReader fileReader=new BufferedReader(new InputStreamReader(inputStream,"UTF-8"));
			CSVParser csvParser=new CSVParser(fileReader,
					CSVFormat.DEFAULT.withFirstRecordAsHeader()
					.withIgnoreHeaderCase().withTrim());)
		 {
			List<CSVRecord>  records=csvParser.getRecords();
			List<Employee> listEmp=new ArrayList<>();
			for(CSVRecord csvRecord: records) {
				Employee employee=new Employee(Long.parseLong(csvRecord.get("id")),csvRecord.get("employee_name"),csvRecord.get("job_title"),Double.parseDouble(csvRecord.get("salary")));
				listEmp.add(employee);
			}
			
		   return listEmp;
		}catch(IOException e) {
			e.printStackTrace();
		}
		return null;
	}
}
