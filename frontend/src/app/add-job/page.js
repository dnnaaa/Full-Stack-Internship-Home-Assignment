'use client';

import React, { useState } from "react";
import JobForm from "../../components/JobForm";
import { useRouter } from 'next/navigation';

const AddJobPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (job) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:3000/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(job),
      });

      const result = await response.json();

      if (response.ok) {
        console.log(result.message);
        router.push('/');
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      setError('Erreur lors de l\'envoi des données');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-job-container">
      <h1>Ajouter un Job</h1>
      <JobForm onSubmit={handleSubmit} />
      {loading && <p>Chargement...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default AddJobPage;
