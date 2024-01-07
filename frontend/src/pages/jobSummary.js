import React, { useEffect, useState } from 'react';

const JobSummaryTable = () => {
  const [jobSummaries, setJobSummaries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/v1/employees/jobsummaries');
        if (response.ok) {
          const data = await response.json();
          setJobSummaries(data);
        } else {
          console.error('Failed to fetch job summaries');
        }
      } catch (error) {
        console.error('Error fetching job summaries:', error);
      }
    };

    fetchData();
  }, []); // The empty dependency array ensures that the effect runs only once on component mount

  return (
    <div>
      <h1>Job Summaries</h1>
      <table>
        <thead>
          <tr>
            <th>Job Title</th>
            <th>Average Salary</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(jobSummaries).map(([jobTitle, averageSalary]) => (
            <tr key={jobTitle}>
              <td>{jobTitle}</td>
              <td>{averageSalary}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default JobSummaryTable;
