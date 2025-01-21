import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function JobFormPage() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [salary, setSalary] = useState('');
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams(); // Récupère l'ID de l'URL si on édite un emploi existant

    // Si un ID est présent, on doit récupérer les informations de l'emploi à modifier
    useEffect(() => {
        if (id) {
            setIsEditing(true);
            axios.get(`http://localhost:8080/api/jobs/${id}`)
                .then(response => {
                    const job = response.data;
                    setTitle(job.title);
                    setDescription(job.description);
                    setLocation(job.location);
                    setSalary(job.salary);
                })
                .catch(error => {
                    console.error('Erreur lors de la récupération de l\'emploi:', error);
                    setError("Une erreur est survenue lors de la récupération des détails de l'emploi.");
                });
        }
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const jobData = { title, description, location, salary };

        if (isEditing) {
            // Mettre à jour l'emploi
            axios.put(`http://localhost:8080/api/jobs/${id}`, jobData)
                .then(() => {
                    navigate('/');
                })
                .catch(error => {
                    console.error('Erreur lors de la mise à jour de l\'emploi:', error);
                    setError("Une erreur est survenue lors de la mise à jour de l'emploi.");
                });
        } else {
            // Créer un nouvel emploi
            axios.post('http://localhost:8080/api/jobs', jobData)
                .then(() => {
                    navigate('/');
                })
                .catch(error => {
                    console.error('Erreur lors de la création de l\'emploi:', error);
                    setError("Une erreur est survenue lors de la création de l'emploi.");
                });
        }
    };

    return (
        <div>
            <h1>{isEditing ? 'Modifier l\'emploi' : 'Créer un emploi'}</h1>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Titre</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Lieu</label>
                    <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Salaire</label>
                    <input
                        type="number"
                        value={salary}
                        onChange={(e) => setSalary(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">{isEditing ? 'Mettre à jour' : 'Créer'}</button>
            </form>
        </div>
    );
}

export default JobFormPage;
