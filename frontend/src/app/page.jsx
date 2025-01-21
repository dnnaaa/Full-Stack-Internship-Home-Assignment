"use client";

import React, { useState, useEffect } from "react";
import JobTable from "@/components/JobTable";
import Link from "next/link";
import { Button, Container, CircularProgress, Typography } from "@mui/material";
import { useSearchParams, useRouter } from "next/navigation";

const Page = () => {
    const searchParams = useSearchParams();
    const router = useRouter();

    let page = searchParams.get("page") ? parseInt(searchParams.get("page"), 10) : 0;
    let size = searchParams.get("size") ? parseInt(searchParams.get("size"), 10) : 10;

    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchJobs = async () => {
            setLoading(true);
            try {
                const response = await fetch(`/api/jobs?page=${page}&size=${size}`);
                if (!response.ok) {
                    setError("Could not fetch jobs at this time, please try again.");
                    return;
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
    }, [page, size]);  // Depend on page and size to re-fetch when they change

    // Handle pagination changes
    const handlePageChange = (newPage) => {
        router.push(`?page=${newPage}&size=${size}`, { scroll: false });
    };

    const handleDelete = async (id) => {
        const confirmation = window.confirm("Are you sure you want to delete this job?");
        if (!confirmation) return;

        try {
            const response = await fetch(`/api/jobs/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                alert("An error occurred while trying to delete the job. Please try again later.");
                return;
            }

            // Update the jobs state to remove the deleted job
            setJobs((prevJobs) => ({
                ...prevJobs,
                content: prevJobs.content.filter((job) => job.id !== id),
            }));

            alert("Job deleted successfully");
        } catch (error) {
            alert("An error occurred while trying to delete the job. Please try again later.");
            console.error(error);
        }
    };

    if (loading) {
        return (
            <Container>
                <CircularProgress />
                <Typography variant="h6">Loading...</Typography>
            </Container>
        );
    }

    if (error) {
        return (
            <Container>
                <Typography color="error">{error}</Typography>
            </Container>
        );
    }

    return (
        <Container style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <h1>Job List</h1>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', marginBottom: '23px' }}>
                <Link href="/add-job">
                    <Button variant="contained">New Job</Button>
                </Link>
            </div>
            {jobs.content?.length === 0 ? (
                <Typography variant="h6">No jobs at the moment</Typography>
            ) : (
                <JobTable jobsSlice={jobs} onDelete={handleDelete} onPageChange={handlePageChange} />
            )}
        </Container>
    );
};

export default Page;