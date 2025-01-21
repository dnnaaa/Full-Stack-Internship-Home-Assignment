import React, { useEffect, useState } from 'react';
import { fetchJobs, updateJob } from '../services/api';
import { useNavigate, useParams } from 'react-router-dom';
import { TextField, Button, Box, Typography } from '@mui/material';

function UpdateJobForm() {
    const [job, setJob] = useState({
        title: '',
        description: '',
        location: '',
        salary: '',
    });
    const [error, setError] = useState(null);
    const { id } = useParams(); // Récupère l'ID de l'emploi depuis l'URL
    const navigate = useNavigate();

    useEffect(() => {
        const loadJob = async () => {
            try {
                const data = await fetchJobs();
                const jobToEdit = data.find((j) => j.id === parseInt(id, 10));
                if (jobToEdit) {
                    setJob(jobToEdit);
                } else {
                    setError("L'emploi spécifié est introuvable.");
                }
            } catch (err) {
                console.error("Erreur lors du chargement de l'emploi :", err);
                setError("Une erreur est survenue.");
            }
        };

        loadJob();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setJob({ ...job, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateJob(id, job);
            alert("Emploi mis à jour avec succès !");
            navigate('/');
        } catch (err) {
            console.error("Erreur lors de la mise à jour de l'emploi :", err);
            setError("Une erreur est survenue lors de la mise à jour.");
        }
    };

    if (error) {
        return <Typography color="error">{error}</Typography>;
    }

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
                Modifier l'offre d'emploi
            </Typography>
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
                    Mettre à jour
                </Button>
                <Button onClick={() => navigate('/')} variant="outlined" color="secondary">
                    Annuler
                </Button>
            </Box>
        </Box>
    );
}

export default UpdateJobForm;
