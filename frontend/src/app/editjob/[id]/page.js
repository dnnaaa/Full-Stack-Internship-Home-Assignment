"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

export default function EditJobPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const router = useRouter();
  const { id } = useParams(); // get id from url

  useEffect(() => {
    if (id) {
      const fetchJobDetails = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/jobs/${id}`);
          const { title, description, location, salary } = response.data;
          setTitle(title);
          setDescription(description);
          setLocation(location);
          setSalary(salary.toString());
        } catch (error) {
          console.error("Error fetching job details:", error);
        }
      };

      fetchJobDetails();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedJob = {
      title,
      description,
      location,
      salary: parseFloat(salary),
    };

    try {
      await axios.put(`http://localhost:8080/jobs/${id}`, updatedJob);
      router.push("/"); // rediriger vers page principale
    } catch (error) {
      console.error("Error updating job:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Update Job</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Job Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Job Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">
            Job Location
          </label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="salary" className="block text-sm font-medium text-gray-700">
            Salary
          </label>
          <input
            type="number"
            id="salary"
            value={salary}
            onChange={(e) => {
              const value = e.target.value;
              if (value === "" || /^[0-9]+(\.[0-9]{0,2})?$/.test(value)) {
                setSalary(value);
              }
            }}
            className="pl-12 mt-1 p-2 border border-gray-300 rounded w-full"
            placeholder="Enter salary"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Update
        </button>
        <button
          type="button"
          onClick={() => router.push("/")}
          className="bg-gray-500 text-white px-4 py-2 rounded ml-2"
        >
          Cancel
        </button>
      </form>
    </div>
  );
}
