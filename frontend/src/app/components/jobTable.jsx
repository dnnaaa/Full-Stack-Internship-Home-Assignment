import Link from 'next/link';
import axios from '../../../utils/axios';

export default function JobTable({ jobs, onDelete }) {
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      try {
        await axios.delete(`/jobs/${id}`);
        onDelete(id);
      } catch (error) {
        console.error("Failed to delete job:", error);
      }
    }
  };

  return (
    <div>
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Id</th>
            <th className="px-4 py-2 border">Title</th>
            <th className="px-4 py-2 border">Description</th>
            <th className="px-4 py-2 border">Location</th>
            <th className="px-4 py-2 border">Salary</th>
            <th className="px-4 py-2 border">Posted At</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job.id}>
              <td className="px-4 py-2 border">{job.id}</td>
              <td className="px-4 py-2 border">{job.title}</td>
              <td className="px-4 py-2 border">{job.description}</td>
              <td className="px-4 py-2 border">{job.location}</td>
              <td className="px-4 py-2 border">{'$' + job.salary}</td>
              <td className="px-4 py-2 border">{new Date(job.postedAt).toISOString().split('T')[0]}</td>
              <td className="px-4 py-2 border">
                <Link href={`/jobs/edit/${job.id}`}>
                  <button className="bg-yellow-500 text-white p-2 rounded-md hover:bg-yellow-600 mr-2">
                    Edit
                  </button>
                </Link>
                <button
                  onClick={() => handleDelete(job.id)}
                  className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
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
