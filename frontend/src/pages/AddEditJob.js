import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getJobById, createJob, updateJob } from '../services/jobService';
import Button from '../components/Button';
import Input from '../components/Input';

const AddEditJob = () => {
  const [job, setJob] = useState({ title: '', description: '', location: '', salary: '' });
  const [errors, setErrors] = useState({});
  const { id: idParam } = useParams();
  const navigate = useNavigate();
  const jobId = idParam ? parseInt(idParam, 10) : undefined;

  useEffect(() => {
    if (jobId) {
      const fetchJob = async () => {
        try {
          const response = await getJobById(jobId);
          setJob(response.data);
        } catch (error) {
          console.error('Failed to fetch job:', error);
        }
      };
      fetchJob();
    }
  }, [jobId]);

  const validate = () => {
    let errors = {};
    if (!job.title) errors.title = 'Title is required.';
    if (!job.description) errors.description = 'Description is required.';
    if (job.salary < 0 || !job.salary) errors.salary = 'Salary is required and cannot be negative.';
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      if (jobId) {
        await updateJob(jobId, job);
      } else {
        await createJob(job);
      }
      navigate('/');
    } catch (error) {
      console.error('Failed to save job:', error);
    }
  };

  const handleInputChange = (field) => (e) => {
    setJob({ ...job, [field]: e.target.value });
    setErrors((prevErrors) => {
      if (prevErrors[field]) {
        const newErrors = { ...prevErrors };
        delete newErrors[field];
        return newErrors;
      }
      return prevErrors;
    });
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="p-8 md:max-w-2xl w-full bg-gray-800 rounded-3xl shadow-lg">
        <h1 className="text-3xl font-bold text-gray-300 mb-6">{jobId ? 'Edit Job' : 'Add Job'}</h1>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Title *"
              value={job.title}
              onChange={handleInputChange('title')}
              error={errors.title}
              required
            />
            <Input
              label="Location"
              value={job.location}
              onChange={handleInputChange('location')}
            />
            <Input
              label="Description *"
              value={job.description}
              onChange={handleInputChange('description')}
              error={errors.description}
              required
              multiline
              rows={4}
              className="col-span-1 md:col-span-2" 
            />
            <Input
              label="Salary"
              type="number"
              value={job.salary}
              onChange={handleInputChange('salary')}
              error={errors.salary}
            />
          </div>
          <div className="flex mt-8 justify-end space-x-4">
            <Button 
            type="submit" 
            disabled={Object.keys(errors).length > 0}
            sx={{ borderRadius: '25px' }}
            >
              Save
            </Button>
            <Button 
            onClick={handleBack}
            sx={{ borderRadius: '25px' }}
            >
              Back
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditJob;
