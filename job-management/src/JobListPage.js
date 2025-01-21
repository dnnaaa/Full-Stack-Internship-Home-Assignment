import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function JobListPage() {
    const [jobs, setJobs] = useState([]);
    const [error, setError] = useState(null);

    // Récupérer la liste des emplois
    useEffect(() => {
        axios.get('http://localhost:8080/api/jobs')
            .then(response => {
                setJobs(response.data);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des emplois:', error);
                setError("Une erreur est survenue lors de la récupération des emplois.");
            });
    }, []);

    return (
        <div>
            <h1>Liste des Emplois</h1>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <table>
                <thead>
                <tr>
                    <th>Titre</th>
                    <th>Description</th>
                    <th>Lieu</th>
                    <th>Salaire</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {jobs.length > 0 ? (
                    jobs.map(job => (
                        <tr key={job.id}>
                            <td>{job.title}</td>
                            <td>{job.description}</td>
                            <td>{job.location}</td>
                            <td>{job.salary}</td>
                            <td>
                                <Link to={`/edit/${job.id}`}>Modifier</Link> |
                                <button
                                    onClick={() => handleDelete(job.id)}
                                >
                                    Supprimer
                                </button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr><td colSpan="5">Aucun emploi disponible</td></tr>
                )}
                </tbody>
            </table>
        </div>
    );

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8080/api/jobs/${id}`)
            .then(() => {
                setJobs(jobs.filter(job => job.id !== id)); // Mettre à jour l'état pour supprimer l'emploi de la liste
            })
            .catch(error => {
                console.error('Erreur lors de la suppression de l\'emploi:', error);
                alert("Une erreur est survenue lors de la suppression de l'emploi.");
            });
    };
}

export default JobListPage;
