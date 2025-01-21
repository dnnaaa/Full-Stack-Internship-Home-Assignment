import { useState, useEffect } from 'react';
import axios from '../../../utils/axios';

const JobForm = ({ mode, jobData, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    salary: '',
  });

  useEffect(() => {
    if (mode === 'edit' && jobData) {
      setFormData({
        title: jobData.title,
        description: jobData.description,
        location: jobData.location || '',
        salary: jobData.salary || '',
      });
    }
  }, [mode, jobData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (mode === 'create') {
      try {
        await axios.post('/jobs', formData);
        onSubmit();
      } catch (error) {
        console.error('Error creating job:', error);
      }
    } else if (mode === 'edit') {
      try {
        await axios.put(`/jobs/${jobData.id}`, formData);
        onSubmit();
      } catch (error) {
        console.error('Error updating job:', error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
        />
      </div>

      <div>
        <label htmlFor="location" className="block text-sm font-medium text-gray-700">
          Location
        </label>
        <input
          type="text"
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
        />
      </div>

      <div>
        <label htmlFor="salary" className="block text-sm font-medium text-gray-700">
          Salary
        </label>
        <input
          type="number"
          id="salary"
          name="salary"
          value={formData.salary}
          onChange={handleChange}
          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          {mode === 'create' ? 'Create Job' : 'Update Job'}
        </button>
      </div>
    </form>
  );
};

export default JobForm;
