"use client";

import { useState } from "react";
import { Button } from "../../components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { PlusCircle, Pencil, Trash2,Eye } from "lucide-react";
import Link from "next/link";
import React, { useEffect} from 'react';
import { fetchJobs, deleteJob } from '../../lib/api';




export default function JobsPage() {
  
  const [jobs, setJobs] = useState([]);

  // Fetch jobs when component mounts
  useEffect(() => {
    async function loadJobs() {
      try {
        const jobsData = await fetchJobs();
        setJobs(jobsData);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    }

    loadJobs();
  }, []);


  const deleteJobHandler = async (id: string) => {
    setJobs((prevJobs) => prevJobs.filter((job) => job.id !== id));
    try {
      await deleteJob(id); // Appelle la fonction API pour supprimer le job
       // Met à jour le tableau local des jobs
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };
  
  

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-primary">Job Listings</h1>
        <Link href="/jobs/new">
          <Button className="flex items-center gap-2">
            <PlusCircle className="h-5 w-5" />
            Add New Job
          </Button>
        </Link>
      </div>

      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Salary</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {jobs.map((job) => (
              <TableRow key={job.id}>
                <TableCell className="font-medium">{job.title}</TableCell>
                <TableCell>{job.location}</TableCell>
                <TableCell>{job.salary}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-3">
                    <Link href={`/jobs/${job.id}/edit`}>
                      <Button >
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button
                     
                      onClick={() => deleteJobHandler(job.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>

                   <Link href={`/jobs/${job.id}/details`}>
                      <Button>
                        <Eye className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}