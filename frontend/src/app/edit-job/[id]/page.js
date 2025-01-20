'use client';
import { useRouter, useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import styles from '../../../styles/EditJobPage.css';
import { ToastContainer, toast } from 'react-toastify';

export default function EditJobPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  const [job, setJob] = useState({
    title: '',
    description: '',
    location: '',
    salary: '',
  });

  // Chargement les données du job à modifier
  useEffect(() => {
    if (id) {
      const fetchJob = async () => {
        const response = await fetch(`http://localhost:8080/api/jobs/${id}`);
        const data = await response.json();
        setJob(data);
      };
      fetchJob();
    }
  }, [id]);

  // Handler pour modifier un job
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/api/jobs/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(job),
      });

      if (response.ok) {
        toast.success('Job updated successfully!');
        setJob({ title: '', description: '', location: '', salary: '' }); // Réinitialise l'état

      } else {
        toast.error('Failed to update job.');
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong.');
    }
  };

  // Handler pour les changements dans les champs du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setJob({ ...job, [name]: value });
  };

  return (
    <div key={router.asPath} className={styles.container}>
      <ToastContainer position='top-right' autoClose={3000} />{' '}
      {/* Affichage des notifications */}
      <h2 className={styles.heading}>Edit Job</h2>
      <form onSubmit={handleSubmit}>
        <label className={styles.label}>
          Title:
          <input
            type='text'
            name='title'
            value={job.title}
            onChange={handleChange}
            className={styles.input}
          />
        </label>
        <label className={styles.label}>
          Description:
          <textarea
            name='description'
            value={job.description}
            onChange={handleChange}
            className={styles.textarea}
          />
        </label>
        <label className={styles.label}>
          Location:
          <input
            type='text'
            name='location'
            value={job.location}
            onChange={handleChange}
            className={styles.input}
          />
        </label>
        <label className={styles.label}>
          Salary:
          <input
            type='number'
            name='salary'
            value={job.salary}
            onChange={handleChange}
            className={styles.input}
          />
        </label>
        <button type='submit' className={styles.button}>
          Update Job
        </button>
      </form>
    </div>
  );
}
