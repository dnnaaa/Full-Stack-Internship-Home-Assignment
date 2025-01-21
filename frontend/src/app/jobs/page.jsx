'use client';


import { useEffect, useState } from "react";
import { deleteJob, getAllJobs } from "../services/api";
import { useRouter } from "next/navigation";
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";

export default function JobListPage() {
    const [jobs, setJobs] =useState([]);
    const router = useRouter();
    useEffect(() => {
        const fetchJobs = async () => {
          try {
            const data = await getAllJobs();
            setJobs(data);
          } catch (error) {
            console.error("Error fetching jobs:", error);
          }
        };
    
        fetchJobs();
      }, []);
    const handleEdit = (id) => {
        router.push(`/jobs/add-edit?id=${id}`);
    };
    const handleDelete = async (id) => {
        try {
          const response = await deleteJob(id);
          if (response) {
            setJobs(jobs.filter((job) => job.id !== id));
          }
        } catch (error) {
          console.error("Error deleting job:", error);
        }
    };
    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <Typography variant="h6" className="font-normal">
                    Job list
                </Typography>
                <Button
                    className="bg-green-100 text-green-800 normal-case hover:bg-green-200"
                    onClick={() => router.push('/jobs/add-edit')}
                >
                    New job +
                </Button>
            </div>
            <TableContainer component={Paper} className="border border-gray-200 shadow-none">
                <Table>
                    <TableHead>
                    <TableRow>
                        <TableCell className="bg-gray-50 font-normal text-center border border-gray-200 px-4 py-2">ID</TableCell>
                        <TableCell className="bg-gray-50 font-normal text-center border border-gray-200 px-4 py-2">Title</TableCell>
                        <TableCell className="bg-gray-50 font-normal text-center border border-gray-200 px-4 py-2">Location</TableCell>
                        <TableCell className="bg-gray-50 font-normal text-center border border-gray-200 px-4 py-2">Salary</TableCell>
                        <TableCell className="bg-gray-50 font-normal text-center border border-gray-200 px-4 py-2">Action</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {jobs.map((job) => (
                        <TableRow key={job.id}>
                          <TableCell className="border border-gray-200 text-center px-4 py-2 font-normal">{job.id}</TableCell>
                          <TableCell className="border border-gray-200 text-center px-4 py-2 font-normal">{job.title}</TableCell>
                          <TableCell className="border border-gray-200 text-center px-4 py-2 font-normal">{job.location}</TableCell>
                          <TableCell className="border border-gray-200 text-center px-4 py-2 font-normal">{`$ ${job.salary}`}</TableCell>
                          <TableCell className="border border-gray-200 text-center px-4 py-2">
                            <div className="flex gap-4 justify-center">
                                <Button onClick={() => handleEdit(job.id)} className="bg-blue-50 text-blue-600 normal-case hover:bg-blue-100 px-4 py-1 min-w-0 shadow-none">
                                Update
                                </Button>
                                <Button onClick={() => handleDelete(job.id)} className="bg-red-50 text-red-600 normal-case hover:bg-red-100 px-4 py-1 min-w-0 shadow-none">
                                Delete
                                </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>




        </div>
    )
}
