import React, { useState, ChangeEvent, FormEvent } from 'react';
import { TextField, Button, Box } from '@mui/material';

interface Job {
  id?: number;
  title: string;
  description: string;
  location?: string;
  salary?: number;
}

interface JobFormProps {
  job?: Job;
  onSubmit: (formData: Job) => void;
}

const JobForm: React.FC<JobFormProps> = ({ job, onSubmit }) => {
  const [formData, setFormData] = useState<Job>({
    title: job?.title || '',
    description: job?.description || '',
    location: job?.location || '',
    salary: job?.salary || undefined,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'salary' ? parseFloat(value) || undefined : value,
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Box component='form' onSubmit={handleSubmit} className='p-6'>
      <div className='flex flex-col sm:flex-row sm:justify-between mb-4'>
        <TextField
          label='Title'
          name='title'
          value={formData.title}
          onChange={handleChange}
          fullWidth
          required
          className='sm:mr-2 mb-4 sm:mb-0'
        />
        <TextField
          label='Location'
          name='location'
          value={formData.location || ''}
          onChange={handleChange}
          fullWidth
          className='sm:ml-2 mb-4 sm:mb-0'
        />
      </div>
      <TextField
        label='Description'
        name='description'
        value={formData.description}
        onChange={handleChange}
        fullWidth
        required
        className='mb-4'
        multiline
        rows={4}
      />
      <div className='flex flex-col sm:flex-row sm:justify-between sm:space-x-2'>
        <TextField
          label='Salary'
          name='salary'
          type='number'
          value={formData.salary || ''}
          onChange={handleChange}
          fullWidth
          className='mb-4 sm:mb-0'
        />
        <Button
          variant='contained'
          color='success'
          type='submit'
          className='sm:w-1/5 mt-4 sm:mt-0'
          sx={{
            height: '56px',
          }}>
          {job ? 'Save' : 'Add'}
        </Button>
      </div>
    </Box>
  );
};

export default JobForm;
