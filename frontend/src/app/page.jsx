'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../styles/JobsPage.module.css';

/**
 * Composant JobsPage - Affiche une liste de jobs avec options d'ajout, modification et suppression.
 */
export default function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const router = useRouter();

  /**
   * Récupère la liste des jobs depuis le backend à l'initialisation du composant.
   */
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/jobs'); // Endpoint pour récupérer les jobs
        if (!response.ok) {
          throw new Error('Failed to fetch jobs');
        }
        const data = await response.json(); // Convertir la réponse en JSON
        setJobs(data); // Mettre à jour l'état avec les données reçues
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };
    fetchJobs();
  }, []);

  /**
   * Supprime un job en fonction de son ID.
   * @param {string} id - L'ID du job à supprimer
   */
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      try {
        const response = await fetch(`http://localhost:8080/api/jobs/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          alert('Job deleted successfully');
          setJobs(jobs.filter((job) => job.id !== id)); // Mettre à jour l'état en supprimant le job
        } else {
          alert('Failed to delete job');
        }
      } catch (error) {
        console.error('Error deleting job:', error);
        alert('An error occurred while deleting the job.');
      }
    }
  };

  /**
   * Navigue vers la page d'ajout de job.
   */
  const navigateToAddJobPage = () => {
    router.push('/add-job'); // Redirige vers la page pour ajouter un nouveau job
  };

  /**
   * Navigue vers la page d'édition pour un job spécifique.
   * @param {string} id - L'ID du job à éditer
   */

  const navigateToEditJobPage = (id) => {
    router.push(`/edit-job/${id}`); // Redirige vers la page d'édition avec l'ID du job
  };

  return (
    <div className={styles.container}>
      <h2>Jobs List</h2>
      {/* Bouton pour ajouter un nouveau job */}
      <button className={styles['new-job-btn']} onClick={navigateToAddJobPage}>
        New Job
      </button>
      {/* Tableau listant tous les jobs */}
      <table className={styles['job-table']}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Location</th>
            <th>Salary</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job.id}>
              <td>{job.id}</td>
              <td>{job.title}</td>
              <td>{job.description}</td>
              <td>{job.location}</td>
              <td>{job.salary}</td>
              <td>
                {/* Bouton pour éditer le job */}
                <button
                  onClick={() => navigateToEditJobPage(job.id)}
                  className={`${styles['action-btn']} ${styles['update-btn']}`}>
                  Update
                </button>
                {/* Bouton pour supprimer le job */}
                <button
                  onClick={() => handleDelete(job.id)}
                  className={`${styles['action-btn']} ${styles['delete-btn']}`}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
