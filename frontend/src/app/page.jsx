'use client';

import { useEffect, useState } from "react";
import { deleteJob, getAllJobs } from "./services/api";
import { useRouter } from "next/navigation";
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import JobTable from "./components/JobTable";

export default function JobListPage() {
    const [jobs, setJobs] =useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    useEffect(() => {
        const fetchJobs = async () => {
          setLoading(true);
          try {
            const data = await getAllJobs();
            setJobs(data);
          } catch (error) {
            console.error("Error fetching jobs:", error);
          } finally {
            setLoading(false);
          }
        };
        
        //Show the notification when the job list page loads
        const notification = localStorage.getItem('jobNotification');
        if (notification) {
            const { message, type } = JSON.parse(notification);
            toast[type](message);
            localStorage.removeItem('jobNotification');
        }

        fetchJobs();
      }, []);
    const handleEdit = (id) => {
        router.push(`/add-edit?id=${id}`);
    };
    const handleDelete = async (id) => {
        try {
          const response = await deleteJob(id);
          if (response) {
            setJobs(jobs.filter((job) => job.id !== id));
            toast.success("Job deleted successfully!");
          }
        } catch (error) {
          console.error("Error deleting job:", error);
        }
    };
    return (
        <div className="p-6">
            <ToastContainer position="top-right" autoClose={3000} />
            <div className="flex justify-between items-center mb-4">
                <Typography variant="h6" className="font-normal">
                    Job list
                </Typography>
                <Button
                    className="bg-green-100 text-green-800 normal-case hover:bg-green-200"
                    onClick={() => router.push('/add-edit')}
                >
                    New job +
                </Button>
            </div>
            <JobTable jobs={jobs} loading={loading} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
    )
}
