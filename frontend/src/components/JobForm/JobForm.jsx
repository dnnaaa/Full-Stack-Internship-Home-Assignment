import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './JobForm.css';

const JobForm = ({ onSubmit, initialData = {}, isEditing = false }) => {
  const [formData, setFormData] = useState({
    title: initialData.title || '',
    location: initialData.location || '',
    description: initialData.description || '',
    salary: initialData.salary || '',
  });

  const [errors, setErrors] = useState({}); // État pour les messages d'erreur

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Mise à jour des données
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'salary' ? (value ? Number(value) : '') : value,
    }));

    // Suppression de l'erreur pour ce champ
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required.';
    }
    if (!formData.location.trim()) {
      newErrors.location = 'Location is required.';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required.';
    }
    if (formData.salary === '' || formData.salary <= 0) {
      newErrors.salary = 'Salary must be a positive number.';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onSubmit(formData); // Soumission des données
  };

  return (
    <div className="job-form-container">
      <h2>{isEditing ? 'Update Job' : 'Create New Job'}</h2>
      <form onSubmit={handleSubmit} className="job-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter job title"
            />
            {errors.title && <p className="error-text">{errors.title}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter job location"
            />
            {errors.location && <p className="error-text">{errors.location}</p>}
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter job description"
              rows="4"
            />
            {errors.description && <p className="error-text">{errors.description}</p>}
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="salary">Salary</label>
            <input
              type="number"
              id="salary"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              placeholder="Enter job salary"
            />
            {errors.salary && <p className="error-text">{errors.salary}</p>}
           
          </div>
          <button type="submit" className="btn-add">
               {isEditing ? 'Save' : 'Add'}
            </button>
        </div>
  
      </form>
    </div>
  );
};

JobForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialData: PropTypes.object,
  isEditing: PropTypes.bool,
};

export default JobForm;
