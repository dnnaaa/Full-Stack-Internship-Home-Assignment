import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

// Fetch job details by ID outside the component
const loadJob = async (id, setJob) => {
    const result = await axios.get(`http://localhost:8081/job/${id}`);
    setJob(result.data);
};

export default function ViewJob() {
    const [job, setJob] = useState({
        title: "",
        description: "",
        location: "",
        salary: "",
    });

    const { id } = useParams();

    useEffect(() => {
        loadJob(id, setJob);
    }, [id]);

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">Job Details</h2>

                    <div className="card">
                        <div className="card-header">
                            Details of Job ID: {job.id}
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">
                                    <b>Title:</b> {job.title}
                                </li>
                                <li className="list-group-item">
                                    <b>Description:</b> {job.description}
                                </li>
                                <li className="list-group-item">
                                    <b>Location:</b> {job.location}
                                </li>
                                <li className="list-group-item">
                                    <b>Salary:</b> {job.salary}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <Link className="btn btn-primary my-2" to={"/"}>
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
