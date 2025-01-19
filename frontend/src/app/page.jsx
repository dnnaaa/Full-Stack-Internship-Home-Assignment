"use client";

import React, { useState, useEffect } from "react";
import JobTable from "@/components/JobTable";
import Link from "next/link";
import { Button, Container, CircularProgress, Typography } from "@mui/material";

const Page = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("/api/jobs");
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des données.");
        }
        const data = await response.json();
        setJobs(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleDelete = async (id) => {
    const confirmation = window.confirm("Êtes-vous sûr de vouloir supprimer ce job ?");
    if (!confirmation) return;

    try {
      const response = await fetch(`/api/jobs/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la suppression du job");
      }

      setJobs((prevJobs) => prevJobs.filter((job) => job.id !== id));
      alert("Job supprimé avec succès");
    } catch (error) {
      alert("Une erreur est survenue lors de la suppression");
      console.error(error);
    }
  };

  if (loading) {
    return (
      <Container>
        <CircularProgress />
        <Typography variant="h6">Chargement...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Typography color="error">Erreur : {error}</Typography>
      </Container>
    );
  }

  return (
    <Container>
      <h1>Liste des Jobs</h1>
      <Link href="/add-job">
        <Button variant="contained">Ajouter un job</Button>
      </Link>
      {jobs.length === 0 ? (
        <Typography variant="h6">Aucun job disponible</Typography>
      ) : (
        <JobTable jobs={jobs} onDelete={handleDelete} />
      )}
    </Container>
  );
};

export default Page;
