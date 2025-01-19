import React from 'react';

const JobTable = ({ jobs, onEdit, onDelete }) => {
    return (
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
            <thead>
                <tr className="border-b bg-gray-100">
                    <th className="px-4 py-2 text-left">ID</th>
                    <th className="px-4 py-2 text-left">Title</th>
                    <th className="px-4 py-2 text-left">Location</th>
                    <th className="px-4 py-2 text-left">Salary</th>
                    <th className="px-4 py-2 text-left">Actions</th>
                </tr>
            </thead>
            <tbody>
                {jobs.map((job) => (
                    <tr key={job.id} className="border-b">
                        <td className="px-4 py-2">{job.id}</td>
                        <td className="px-4 py-2">{job.title}</td>
                        <td className="px-4 py-2">{job.location}</td>
                        <td className="px-4 py-2">$ {job.salary}</td>
                        <td className="px-4 py-2">
                            <button
                                className="bg-blue-500 text-white py-1 px-4 rounded mr-2"
                                onClick={() => onEdit(job)}
                            >
                                Edit
                            </button>
                            <button
                                className="bg-red-500 text-white py-1 px-4 rounded"
                                onClick={() => onDelete(job)}
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default JobTable;
