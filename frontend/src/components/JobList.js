import React, { useEffect, useState } from 'react';
import { fetchJobs, deleteJob } from '../services/api';
import { useNavigate } from 'react-router-dom';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
} from '@mui/material';

function JobList() {
    const [jobs, setJobs] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const loadJobs = async () => {
            try {
                const data = await fetchJobs();
                console.log("Données récupérées :", data);
                setJobs(data);
            } catch (error) {
                setError("Impossible de charger les emplois.");
                console.error(error);
            }
        };

        loadJobs();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer cet emploi ?")) {
            try {
                await deleteJob(id);
                setJobs(jobs.filter((job) => job.id !== id)); // Mise à jour de la liste après suppression
                alert("Emploi supprimé avec succès !");
            } catch (error) {
                alert("Erreur lors de la suppression de l'emploi.");
                console.error(error);
            }
        }
    };

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Titre</TableCell>
                        <TableCell>Lieu</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {jobs.map((job) => (
                        <TableRow key={job.id}>
                            <TableCell>{job.title}</TableCell>
                            <TableCell>{job.location}</TableCell>
                            <TableCell>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => navigate(`/update-job/${job.id}`)}
                                    style={{ marginRight: 10 }}
                                >
                                    Modifier
                                </Button>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => handleDelete(job.id)}
                                >
                                    Supprimer
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default JobList;
