package ma.dnaengineering.backend.service;

import ma.dnaengineering.backend.dto.EmployeeDTO;
import ma.dnaengineering.backend.dto.JobSummaryDTO;
import ma.dnaengineering.backend.entity.Employee;
import ma.dnaengineering.backend.entity.JobSummary;
import ma.dnaengineering.backend.mapper.EmployeeMapper;
import ma.dnaengineering.backend.mapper.JobSummaryMapper;
import ma.dnaengineering.backend.repository.EmployeeRepository;
import ma.dnaengineering.backend.repository.JobSummaryRepository;
import ma.dnaengineering.backend.response.Response;
import ma.dnaengineering.backend.response.ResponseMessage;
import ma.dnaengineering.backend.response.ResponseStatus;
import ma.dnaengineering.backend.utils.CSVParser;
import ma.dnaengineering.backend.utils.ValidationUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class EmployeeServiceImpl implements EmployeeService {

    EmployeeRepository employeeRepository;

    JobSummaryRepository jobSummaryRepository;

    /**
     * Uploads a file and processes the data to save employees and job summaries.
     *
     * @param file the file to upload
     * @return the response indicating the status of the upload
     */
    @Override
    public Response process(MultipartFile file) {
        List<EmployeeDTO> employeeDTOs;
        List<JobSummary> jobSummaries;
        List<Employee> employees;
        Response response = new Response();

        // Check if the file is valid
        if (!ValidationUtils.isValidFile(file)) {
            response.setStatus(ResponseStatus.FAILURE);
            response.setMessage(ResponseMessage.INVALID_FILE);
            return response;
        }

        try {
            // Parse the CSV file to get employee DTOs
            employeeDTOs = CSVParser.parse(file);

            // Map employee DTOs to job summaries
            jobSummaries = mapToJobSummaries(employeeDTOs);

            // Save job summaries
            jobSummaries = jobSummaryRepository.saveAll(jobSummaries);

            // Map employee DTOs to employees
            employees = maToEmployees(employeeDTOs, jobSummaries);

            // Save employees
            employeeRepository.saveAll(employees);

            response.setStatus(ResponseStatus.SUCCESS);
            response.setMessage(ResponseMessage.UPLOADED_SUCCESSFULLY);

        } catch (Exception e) {
            response.setStatus(ResponseStatus.FAILURE);
            response.setMessage(ResponseMessage.ERROR);
        }

        return response;
    }

    /**
     * Maps a list of EmployeeDTO objects to a list of Employee objects.
     *
     * @param employeeDTOs the list of EmployeeDTO objects to be mapped
     * @param jobSummaries the list of JobSummary objects used for mapping
     * @return the list of mapped Employee objects
     */
    public List<Employee> maToEmployees(List<EmployeeDTO> employeeDTOs, List<JobSummary> jobSummaries) {
        List<Employee> employees = new ArrayList<>();

        // Iterate over each EmployeeDTO object
        employeeDTOs.forEach(employeeDTO -> {
            // Find the corresponding JobSummary object based on the job title
            JobSummary jobSummary = jobSummaries.stream()
                    .filter(js -> js.getTitle().equals(employeeDTO.getJobTitle()))
                    .findFirst()
                    .orElseThrow();

            // Map the EmployeeDTO object to an Employee object using the EmployeeMapper
            Employee employee = EmployeeMapper.mapToEmployee(employeeDTO, jobSummary);

            // Add the mapped Employee object to the list
            employees.add(employee);
        });

        return employees;
    }

    /**
     * Maps a list of EmployeeDTO objects to a list of JobSummary objects.
     *
     * @param employees the list of EmployeeDTO objects to be mapped
     * @return the list of JobSummary objects mapped from the EmployeeDTO objects
     */
    private List<JobSummary> mapToJobSummaries(List<EmployeeDTO> employees) {
        // Calculate the average salaries for each job title
        Map<String, Float> averageSalariesByJobTitle = employees.stream()
                .collect(Collectors.groupingBy(EmployeeDTO::getJobTitle, Collectors.averagingDouble(EmployeeDTO::getSalary)))
                .entrySet().stream()
                .collect(Collectors.toMap(Map.Entry::getKey, entry -> entry.getValue().floatValue()));

        // Map the average salaries to JobSummary objects
        return averageSalariesByJobTitle.entrySet().stream()
                .map(entry -> JobSummaryMapper.mapToJobSummary(entry.getKey(), entry.getValue()))
                .collect(Collectors.toList());

    }

    /**
     * Retrieves a page of employee data.
     *
     * @param page the page number
     * @param size the number of employees per page
     * @return the response containing the employee data
     */
    @Override
    public Response getEmployees(int page, int size) {
        // Create a new response object
        Response response = new Response();

        // Retrieve a page of employees from the repository
        Page<Employee> employees = employeeRepository.findAll(PageRequest.of(page-1, size));

        // Map the employee entities to employee DTOs
        List<EmployeeDTO> employeeDTOs = employees.stream()
                .map(EmployeeMapper::mapToEmployeeDTO)
                .collect(Collectors.toList());

        // Create a data map to hold the employee DTOs
        HashMap<String, Object> data = new HashMap<>();
        data.put("employees", employeeDTOs);
        data.put("totalPages", employees.getTotalPages());

        // Set the data, status, and message for the response
        response.setData(data);
        response.setStatus(ResponseStatus.SUCCESS);
        response.setMessage(ResponseMessage.RETRIEVED_SUCCESSFULLY);

        // Return the response
        return response;
    }

    /**
     * Retrieves the job summaries from the repository and returns them in a response object.
     *
     * @param page The page number of the job summaries to retrieve
     * @param size The number of job summaries per page
     * @return A response object containing the job summaries
     */
    @Override
    public Response getJobSummaries(int page, int size) {
        // Create a new response object
        Response response = new Response();

        // Retrieve all job summaries from the repository
        Page<JobSummary> jobSummaries = jobSummaryRepository.findAll(PageRequest.of(page - 1, size));

        // Map the job summary entities to job summary DTOs
        List<JobSummaryDTO> jobSummaryDTOs = jobSummaries.stream()
                .map(JobSummaryMapper::mapToJobSummaryDTO)
                .collect(Collectors.toList());

        // Create a data map to hold the job summary DTOs
        HashMap<String, Object> data = new HashMap<>();
        data.put("jobSummaries", jobSummaryDTOs);
        data.put("totalPages", jobSummaries.getTotalPages());

        // Set the data, status, and message for the response
        response.setData(data);
        response.setStatus(ResponseStatus.SUCCESS);
        response.setMessage(ResponseMessage.RETRIEVED_SUCCESSFULLY);

        // Return the response
        return response;
    }
    @Autowired
    public void setEmployeeRepository(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    @Autowired
    public void setJobSummaryRepository(JobSummaryRepository jobSummaryRepository) {
        this.jobSummaryRepository = jobSummaryRepository;
    }
}
