"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

export default function EditJobPage() {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        location: "",
        salary: "",
    });

    const router = useRouter();

    useEffect(() => {
        const fetchJob = async () => {
            const res = await fetch(`http://localhost:8080/jobs/${id}`);
            const data = await res.json();
            setFormData(data);
        };
        fetchJob();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch(`http://localhost:8080/jobs/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        if (res.ok) {
            router.push("/");
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Edit Job</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium">Title</label>
                    <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="border rounded w-full px-4 py-2"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Description</label>
                    <textarea
                        value={formData.description}
                        onChange={(e) =>
                            setFormData({ ...formData, description: e.target.value })
                        }
                        className="border rounded w-full px-4 py-2"
                        required
                    ></textarea>
                </div>
                <div>
                    <label className="block text-sm font-medium">Location</label>
                    <input
                        type="text"
                        value={formData.location}
                        onChange={(e) =>
                            setFormData({ ...formData, location: e.target.value })
                        }
                        className="border rounded w-full px-4 py-2"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Salary</label>
                    <input
                        type="number"
                        value={formData.salary}
                        onChange={(e) =>
                            setFormData({ ...formData, salary: e.target.value })
                        }
                        className="border rounded w-full px-4 py-2"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Update
                </button>
            </form>
        </div>
    );
}
