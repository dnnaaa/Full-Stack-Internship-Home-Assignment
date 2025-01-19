import React from 'react';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

const JobTable = ({ jobs, onDelete }) => {
  return (
    <div style={{ marginTop: '20px' }}>
      <table style={{ width: '100%', marginBottom: '20px', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ padding: '10px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Title</th>
            <th style={{ padding: '10px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Location</th>
            <th style={{ padding: '10px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Salary</th>
            <th style={{ padding: '10px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job.id}>
              <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{job.title}</td>
              <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{job.location}</td>
              <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{job.salary}</td>
              <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                <Link to={`/edit-job/${job.id}`}>
                  <Button variant="contained" color="primary">Edit</Button>
                </Link>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => onDelete(job.id)}
                  sx={{ marginLeft: 1 }}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/add-job">
        <Button variant="contained" color="success">
          Add Job
        </Button>
      </Link>
    </div>
  );
};

export default JobTable;
