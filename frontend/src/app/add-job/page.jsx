'use client';

import { useState } from 'react';
import styles from '../../styles/AddJobPage.module.css';

export default function AddJobPage() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    salary: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Envoi des données à l'API
    const response = await fetch('http://localhost:8080/api/jobs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert('Job created successfully!');
      setFormData({
        title: '',
        description: '',
        location: '',
        salary: '',
      });
    } else {
      alert('Failed to create job');
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Add a New Job</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>
          Title:
          <input
            type='text'
            name='title'
            className={styles.input}
            value={formData.title}
            onChange={handleChange}
          />
        </label>
        <label className={styles.label}>
          Description:
          <textarea
            name='description'
            className={styles.textarea}
            value={formData.description}
            onChange={handleChange}
          />
        </label>
        <label className={styles.label}>
          Location:
          <input
            type='text'
            name='location'
            className={styles.input}
            value={formData.location}
            onChange={handleChange}
          />
        </label>
        <label className={styles.label}>
          Salary:
          <input
            type='number'
            name='salary'
            className={styles.input}
            value={formData.salary}
            onChange={handleChange}
          />
        </label>
        <button type='submit' className={styles.button}>
          Create Job
        </button>
      </form>
    </div>
  );
}
