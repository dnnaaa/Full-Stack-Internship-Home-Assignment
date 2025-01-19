"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddJobPage() {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        location: "",
        salary: "",
    });

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:8080/jobs", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!res.ok) {
                throw new Error("Network response was not ok");
            }

            const data = await res.json();
            console.log(data);
            if (res.ok) {
                router.push("/");
            }
        } catch (error) {
            console.error("Fetch error:", error);
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Add Job</h1>
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
                    Submit
                </button>
            </form>
        </div>
    );
}
