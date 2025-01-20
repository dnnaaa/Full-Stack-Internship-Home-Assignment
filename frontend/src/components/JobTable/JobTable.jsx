import React from 'react';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './JobTable.css';

const JobTable = ({ jobs, onEdit, onDelete }) => {
  const handleEdit = (job) => {

    onEdit(job);
  };

  const handleDelete = (id) => {
    toast.error(`Job with ID ${id} deleted`, { position: "top-right"  ,autoClose:5000 });
    onDelete(id);
  };

  return (
    <div className="job-table-container">
      <ToastContainer  autoClose={5000}/>
      <table className="job-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Location</th>
            <th>Salary</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <tr key={job.id}>
                <td>{job.id}</td>
                <td>{job.title}</td>
                <td>{job.location}</td>
                <td>{typeof job.salary === 'number' ? job.salary.toLocaleString() : 'N/A'}</td>
                <td>
                  <button
                    className="btn btn-update"
                    onClick={() => handleEdit(job)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-delete"
                    onClick={() => handleDelete(job.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="no-data">
                No jobs available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

JobTable.propTypes = {
  jobs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired,
      salary: PropTypes.number.isRequired,
    })
  ).isRequired,
  onEdit: PropTypes.func.isRequired, // Fonction pour gérer les mises à jour
  onDelete: PropTypes.func.isRequired, // Fonction pour gérer les suppressions
};

export default JobTable;
