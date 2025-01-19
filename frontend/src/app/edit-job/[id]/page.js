'use client';

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import JobForm from "../../../components/JobForm";

const UpdateJobPage = () => {
  const { id: jobId } = useParams();
  const router = useRouter();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!jobId) {
      setError("Aucun ID de job fourni.");
      setLoading(false);
      return;
    }

    const fetchJob = async () => {
      try {
        const response = await fetch(`/api/jobs/${jobId}`);
        if (!response.ok) {
          throw new Error(`Erreur HTTP : ${response.status}`);
        }

        const data = await response.json();
        setJob(data);
      } catch (err) {
        console.error("Erreur lors du chargement du job", err);
        setError("Erreur lors du chargement du job. Veuillez réessayer plus tard.");
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [jobId]);

  const handleUpdate = async (updatedJob) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/jobs/${jobId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedJob),
      });

      const result = await response.json();

      if (response.ok) {
        console.log("Job mis à jour avec succès", result);
        router.push('/');
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      setError('Erreur lors de la mise à jour du job');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div style={{ color: "red" }}>{error}</div>;
  }

  if (!job) {
    return <div>Job introuvable.</div>;
  }

  return <JobForm job={job} onSubmit={handleUpdate} />;
};

export default UpdateJobPage;
