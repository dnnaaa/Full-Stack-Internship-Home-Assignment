package ma.dnaengineering.backend.mapper;

import ma.dnaengineering.backend.dto.EmployeeDTO;
import ma.dnaengineering.backend.entity.Employee;
import ma.dnaengineering.backend.entity.JobSummary;

public abstract class EmployeeMapper {

    /**
     * Maps the given parameters to an EmployeeDTO object.
     *
     * @param  id     the ID of the employee
     * @param  name   the name of the employee
     * @param  job    the job of the employee
     * @param  salary the salary of the employee
     * @return        the EmployeeDTO object with the mapped parameters
     */
    public static EmployeeDTO mapToEmployeeDTO(Long id, String name, String job, Float salary) {
        EmployeeDTO employeeDTO = new EmployeeDTO();
        employeeDTO.setId(id);
        employeeDTO.setName(name);
        employeeDTO.setJobTitle(job);
        employeeDTO.setSalary(salary);
        return employeeDTO;
    }



    /**
     * Maps an Employee object to an EmployeeDTO object.
     *
     * @param employee the Employee object to be mapped
     * @return the mapped EmployeeDTO object
     */
    public static EmployeeDTO mapToEmployeeDTO(Employee employee) {
        EmployeeDTO employeeDTO = new EmployeeDTO();
        employeeDTO.setId(employee.getId());    // Set the id of the employeeDTO
        employeeDTO.setName(employee.getName());// Set the name of the employeeDTO
        employeeDTO.setJobTitle(employee.getJobSummary().getTitle());    // Set the job of the employeeDTO
        employeeDTO.setSalary(employee.getSalary());    // Set the salary of the employeeDTO
        return employeeDTO;    // Return the mapped employeeDTO
    }


    /**
     * Maps an EmployeeDTO object to an Employee object.
     *
     * @param  employeeDTO  the EmployeeDTO object to be mapped
     * @param  jobSummary   the JobSummary object to be set in the mapped Employee object
     * @return              the mapped Employee object
     */
    public static Employee mapToEmployee(EmployeeDTO employeeDTO, JobSummary jobSummary) {
        Employee employee = new Employee();
        employee.setId(employeeDTO.getId());
        employee.setName(employeeDTO.getName());
        employee.setSalary(employeeDTO.getSalary());
        employee.setJobSummary(jobSummary);
        return employee;
    }
}
