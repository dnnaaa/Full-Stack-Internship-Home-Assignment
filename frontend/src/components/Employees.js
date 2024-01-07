import axios from 'axios';
import { useEffect, useState } from 'react';


const Employees = (currentPage, pageSize) =>{

    const [employeelist,setemoloyeelist]=useState([]);
    const [jobSummary , setJobSummary]=useState([]);
    const [totalPages, setTotalPages] = useState(1);


    useEffect(() =>{

      const fetchEmployees=async()=>{

        try {
            
            const response=await axios.get('http://localhost:9093/api/employees/getEmployees?page=${page}&pageSize=${pageSize}');
            setemoloyeelist(response.data);
            setTotalPages(response.headers[x-total-pages]);

        } catch (error) {

            console.error('Error fetching employees:',error);
            
        }
    };

    const fetchJobSummary=async()=>{

        try {
            
            const response=await axios.get('http://localhost:9093/api/employees/getJobSummary?page=${page}&pageSize=${pageSize}');
            setJobSummary(response.data);

        } catch (error) {

            console.error('Error fetching job summary:',error);
            
        }
    };


    fetchEmployees();
    fetchJobSummary();

    },[currentPage,pageSize]);


    return(

    <div>
      <h2>Here is all Employees</h2>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Job Title</th>
            <th>Salary</th>
          </tr>
        </thead>
        <tbody>
          {employeelist.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.name}</td>
              <td>{employee.job_title}</td>
              <td>{employee.salary}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        {Array.from({ length: totalPages }, (_, index) => (
          <button key={index} onClick={() => handlePageChange(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>


      <h2>Job Summary</h2>

      <table>
        <thead>
          <tr>
            <th>Job Title</th>
            <th>Average Salary</th>
          </tr>
        </thead>
        <tbody>
          {jobSummary.map((job) => (
            <tr key={job.jobTitle}>
              <td>{job.jobTitle}</td>
              <td>{job.averageSalary}</td>
            </tr>
          ))}
        </tbody>
      </table>


      
    </div>

    );

};

export default Employees;