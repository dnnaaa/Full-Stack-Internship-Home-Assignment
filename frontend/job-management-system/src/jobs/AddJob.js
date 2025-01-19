import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AddJob() {
    let navigate = useNavigate();

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

    // Handle form submission
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8081/job", job); // API endpoint for adding a job
            navigate("/"); // Redirect to the homepage or job list
        } catch (error) {
            console.error("Error adding job:", error);
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">Add Job</h2>

                    <form onSubmit={onSubmit}>
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">
                                Job Title
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter job title"
                                name="title"
                                value={title}
                                onChange={onInputChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">
                                Job Description
                            </label>
                            <textarea
                                className="form-control"
                                placeholder="Enter job description"
                                name="description"
                                value={description}
                                onChange={onInputChange}
                                rows="4"
                            ></textarea>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="location" className="form-label">
                                Job Location
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter job location"
                                name="location"
                                value={location}
                                onChange={onInputChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="salary" className="form-label">
                                Salary
                            </label>
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Enter job salary"
                                name="salary"
                                value={salary}
                                onChange={onInputChange}
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
