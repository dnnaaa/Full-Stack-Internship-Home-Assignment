'use client';

import React, {useEffect, useState} from "react";
import {useParams, useRouter} from "next/navigation";
import JobForm from "../../../components/JobForm";

const UpdateJobPage = () => {
    const {id: jobId} = useParams();
    const router = useRouter();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!jobId) {
            setError("No id found in the params.");
            setLoading(false);
            return;
        }

        const fetchJob = async () => {
            try {
                const response = await fetch(`/api/jobs/${jobId}`);
                if (!response.ok) {
                    setError("Could not fetch the jod, please try again.");
                }

                const data = await response.json();
                setJob(data);
            } catch (err) {
                setError("An error occurred while fetching job, please try again.");
            } finally {
                setLoading(false);
            }
        };
        fetchJob();
    }, [jobId]);

    const handleUpdate = async (data) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`/api/jobs/${jobId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
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
        return <div style={{color: "red"}}>{error}</div>;
    }

    if (!job) {
        return <div>Job introuvable.</div>;
    }

    return <JobForm job={job} onSubmit={handleUpdate}/>;
};

export default UpdateJobPage;
