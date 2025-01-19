import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EditJob() {
    let navigate = useNavigate();
    const { id } = useParams();

    // State for the job form
    const [job, setJob] = useState({
        title: "",
        description: "",
        location: "",
        salary: "",
    });

    const { title, description, location, salary } = job;

    // Handle input changes
    const onInputChange = (e) => {
        setJob({ ...job, [e.target.name]: e.target.value });
    };

    // Fetch job details for the given ID
    const loadJob = async () => {
        const result = await axios.get(`http://localhost:8081/job/${id}`);
        setJob(result.data);
    };

    // Load job details on component mount
    useEffect(() => {
        loadJob();
    }, [id]);  // Add 'id' as a dependency here

    // Handle form submission
    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:8081/job/${id}`, job); // Update job by ID
        navigate("/"); // Redirect to the homepage or job list
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">Edit Job</h2>

                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className="mb-3">
                            <label htmlFor="Title" className="form-label">
                                Job Title
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter job title"
                                name="title"
                                value={title}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Description" className="form-label">
                                Job Description
                            </label>
                            <textarea
                                className="form-control"
                                placeholder="Enter job description"
                                name="description"
                                value={description}
                                onChange={(e) => onInputChange(e)}
                                rows="4"
                            ></textarea>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Location" className="form-label">
                                Job Location
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter job location"
                                name="location"
                                value={location}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Salary" className="form-label">
                                Salary
                            </label>
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Enter job salary"
                                name="salary"
                                value={salary}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <button type="submit" className="btn btn-outline-primary">
                            Submit
                        </button>
                        <Link className="btn btn-outline-danger mx-2" to="/">
                            Cancel
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
}
