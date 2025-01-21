import React, { useState, useEffect } from 'react';
import { TextField, Button, Container } from '@mui/material';

const JobForm = ({ job, onSubmit }) => {
  const [title, setTitle] = useState(job?.title || '');
  const [description, setDescription] = useState(job?.description || '');
  const [location, setLocation] = useState(job?.location || '');
  const [salary, setSalary] = useState(job?.salary || '');

  useEffect(() => {
    if (job) {
      setTitle(job.title);
      setDescription(job.description);
      setLocation(job.location);
      setSalary(job.salary);
    }
  }, [job]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const jobData = { title, description, location, salary };
    onSubmit(jobData);
  };

  return (
      <Container className="p-6 bg-white rounded-lg shadow-md w-full max-w-4xl mx-auto">
          <form onSubmit={handleSubmit}>
              {/* Title and Location Fields Side by Side */}
              <div className="flex mb-4 space-x-4">
                  <div className="flex-1">
                      <TextField
                          label="Title"
                          variant="outlined"
                          fullWidth
                          margin="normal"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          required
                          className="focus:ring-indigo-500 focus:border-indigo-500"
                          style={{
                              fontSize: '16px',
                              borderRadius: '8px',
                          }}
                      />
                  </div>
                  <div className="flex-1">
                      <TextField
                          label="Location"
                          variant="outlined"
                          fullWidth
                          margin="normal"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          className="focus:ring-indigo-500 focus:border-indigo-500"
                          style={{
                              fontSize: '16px',
                              borderRadius: '8px',
                          }}
                      />
                  </div>
              </div>

              {/* Description Field */}
              <div className="mb-4">
                  <TextField
                      label="Description"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                      className="focus:ring-indigo-500 focus:border-indigo-500"
                      style={{
                          fontSize: '16px',
                          borderRadius: '8px',
                      }}
                  />
              </div>

              {/* Salary Field and Add Button */}
              <div className="flex items-center mb-4 space-x-4">
                  <div className="flex-1">
                      <TextField
                          label="Salary"
                          variant="outlined"
                          fullWidth
                          margin="normal"
                          value={salary}
                          onChange={(e) => setSalary(e.target.value)}
                          className="focus:ring-indigo-500 focus:border-indigo-500"
                          style={{
                              fontSize: '16px',
                              borderRadius: '8px',
                          }}
                      />
                  </div>
                  <div className="flex justify-end w-full">
                      <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                          className="py-2 bg-indigo-600 hover:bg-indigo-700 text-white"
                          style={{
                              fontSize: '16px',
                              fontWeight: 'bold',
                              borderRadius: '8px',
                          }}
                      >
                          {job ? "Update" : "Create"}
                      </Button>
                  </div>
              </div>
          </form>
      </Container>
  );
};

export default JobForm;
