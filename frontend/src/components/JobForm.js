import React, { useState } from 'react';
import { createJob } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography } from '@mui/material';

function JobForm() {
    const [job, setJob] = useState({
        title: '',
        description: '',
        location: '',
        salary: '',
    });
    const [error, setError] = useState(null); // Gestion des erreurs
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setJob({ ...job, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createJob(job);
            alert('Emploi ajouté avec succès !');
            setJob({ title: '', description: '', location: '', salary: '' });
            navigate('/'); // Redirige vers la liste des emplois
        } catch (err) {
            console.error("Erreur lors de l'ajout de l'emploi :", err);
            setError("Une erreur est survenue lors de l'ajout de l'emploi.");
        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                width: '50%',
                margin: 'auto',
                mt: 5,
                p: 3,
                boxShadow: 3,
                borderRadius: 2,
            }}
        >
            <Typography variant="h5" component="h2" align="center" gutterBottom>
                Ajouter une nouvelle offre d'emploi
            </Typography>
            {error && (
                <Typography color="error" align="center">
                    {error}
                </Typography>
            )}
            <TextField
                label="Titre"
                name="title"
                value={job.title}
                onChange={handleChange}
                required
                fullWidth
            />
            <TextField
                label="Description"
                name="description"
                value={job.description}
                onChange={handleChange}
                required
                multiline
                rows={4}
                fullWidth
            />
            <TextField
                label="Lieu"
                name="location"
                value={job.location}
                onChange={handleChange}
                fullWidth
            />
            <TextField
                label="Salaire"
                name="salary"
                value={job.salary}
                onChange={handleChange}
                type="number"
                fullWidth
            />
            <Box display="flex" justifyContent="space-between">
                <Button type="submit" variant="contained" color="primary">
                    Ajouter
                </Button>
                <Button onClick={() => navigate('/')} variant="outlined" color="secondary">
                    Retour à la liste
                </Button>
            </Box>
        </Box>
    );
}

export default JobForm;
