"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function JobListPage() {
    const [jobs, setJobs] = useState([]);

    // Fetch jobs from the backend API
    useEffect(() => {
        const fetchJobs = async () => {
            const res = await fetch("http://localhost:8080/jobs");
            const data = await res.json();
            setJobs(data);
        };
        fetchJobs();
    }, []);

    // Delete job
    const deleteJob = async (id) => {
        const res = await fetch(`http://localhost:8080/jobs/${id}`, {
            method: "DELETE",
        });
        if (res.ok) {
            setJobs((prevJobs) => prevJobs.filter((job) => job.id !== id));
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Job Management System</h1>
            <Link
                href="/add-job"
                className="bg-blue-500 text-white px-4 py-2 rounded mb-4 inline-block"
            >
                Add Job
            </Link>
            <table className="table-auto w-full border-collapse border border-gray-300 mt-4">
                <thead>
                <tr className="bg-gray-100">
                    <th className="border px-4 py-2">Title</th>
                    <th className="border px-4 py-2">Location</th>
                    <th className="border px-4 py-2">Salary</th>
                    <th className="border px-4 py-2">Actions</th>
                </tr>
                </thead>
                <tbody>
                {jobs.map((job) => (
                    <tr key={job.id}>
                        <td className="border px-4 py-2">{job.title}</td>
                        <td className="border px-4 py-2">{job.location}</td>
                        <td className="border px-4 py-2">{job.salary} MAD</td>
                        <td className="border px-4 py-2">
                            <Link
                                href={`/edit-job/${job.id}`}
                                className="text-blue-500 mr-2"
                            >
                                Edit
                            </Link>
                            <button
                                onClick={() => deleteJob(job.id)}
                                className="text-red-500"
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
