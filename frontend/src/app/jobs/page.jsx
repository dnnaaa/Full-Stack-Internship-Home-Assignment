"use client";

import { useRouter } from "next/navigation";
import DenseTable from "../Components/JobTable";
import { ToastContainer } from "react-toastify";

export default function JobListPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center py-8 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-6xl bg-white rounded-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Job List</h1>
        <div className="flex justify-end mb-4">
          <button
            onClick={() => router.push("/jobs/add")}
            className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Add Job
          </button>
        </div>
        <div className="overflow-x-auto">
          <DenseTable />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
