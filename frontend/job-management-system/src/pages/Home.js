import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

export default function Home() {
    const [jobs, setJobs] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        loadJobs();
    }, []);

    // Fetch all jobs
    const loadJobs = async () => {
        const result = await axios.get("http://localhost:8081/jobs");
        setJobs(result.data);
    };

    // Delete job by ID
    const deleteJob = async (id) => {
        await axios.delete(`http://localhost:8081/job/${id}`);
        loadJobs();
    };

    return (
        <div className="container">
            <div className="py-4">
                <h2 className="text-center mb-4">Job Management</h2>
                <table className="table border shadow">
                    <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Title</th>
                        <th scope="col">Location</th>
                        <th scope="col">Salary</th>
                        <th scope="col">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {jobs.map((job, index) => (
                        <tr key={job.id}>
                            <th scope="row">{index + 1}</th>
                            <td>{job.title}</td>
                            <td>{job.location}</td>
                            <td>{job.salary}</td>
                            <td>
                                <Link
                                    className="btn btn-primary mx-2"
                                    to={`/viewjob/${job.id}`}
                                >
                                    View
                                </Link>
                                <Link
                                    className="btn btn-outline-primary mx-2"
                                    to={`/editjob/${job.id}`}
                                >
                                    Edit
                                </Link>
                                <button
                                    className="btn btn-danger mx-2"
                                    onClick={() => deleteJob(job.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
