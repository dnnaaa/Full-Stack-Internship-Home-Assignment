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
    <Container className="p-8 bg-white rounded-lg shadow-md w-full max-w-xl mx-auto">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <TextField
            label="Titre"
            variant="outlined"
            fullWidth
            margin="normal"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

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
          />
        </div>

        <div className="mb-4">
          <TextField
            label="Lieu"
            variant="outlined"
            fullWidth
            margin="normal"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div className="mb-4">
          <TextField
            label="Salaire"
            variant="outlined"
            fullWidth
            margin="normal"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            className="focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          className="py-2 bg-indigo-600 hover:bg-indigo-700 text-white"
        >
          {job ? "Mettre à jour l'emploi" : "Ajouter l'emploi"}
        </Button>
      </form>
    </Container>
  );
};

export default JobForm;
