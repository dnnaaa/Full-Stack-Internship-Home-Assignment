import React from 'react';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

const JobTable = ({ jobs, onDelete }) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Location</th>
            <th>Salary</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job.id}>
              <td>{job.title}</td>
              <td>{job.location}</td>
              <td>{job.salary}</td>
              <td>
                <Link to={`/edit-job/${job.id}`}>
                  <Button>Edit</Button>
                </Link>
                <Button onClick={() => onDelete(job.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/add-job">
        <Button>Add Job</Button>
      </Link>
    </div>
  );
};

export default JobTable;
