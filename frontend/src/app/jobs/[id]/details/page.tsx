"use client";  // Marque ce fichier comme un composant Client

import { useParams } from 'next/navigation';  
import { useEffect, useState } from 'react';
import { fetchJob } from '../../../../lib/api';
import { ArrowLeft,  Pencil } from 'lucide-react';
import { Button } from '../../../../components/ui/button';
import Link from "next/link";

export default function JobDetailsPage() {
  const params = useParams();  
  const id = params.id;
  const [job, setJob] = useState(null);

  useEffect(() => {
    async function loadJob() {
      if (typeof id === 'string') {
        try {
          const jobData = await fetchJob(id);
          setJob(jobData);
        } catch (error) {
          console.error('Error fetching job:', error);
        }
      }
    }

    if (id) {
      loadJob();
    }
  }, [id]);

  if (!job) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <Link href="/jobs">
          <a className="button-class">
            <ArrowLeft className="h-4 w-4" />
          </a>
        </Link>
          <h1 className="text-4xl font-bold text-primary">Job Details</h1>
          <Link href={`/jobs/${id}/edit`}>
            <Button className="flex items-center gap-2">
              <Pencil className="h-5 w-5" />
              Edit Job
            </Button>
        </Link>
        </div>
      
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-4xl font-bold text-primary mb-4">{job.title}</h1>
        <p className="mt-4 text-lg text-gray-700">{job.description}</p>
        <div className="mt-4">
          <span className="font-medium">Location:</span> {job.location}
        </div>
        <div className="mt-4">
          <span className="font-medium">Salary:</span> {job.salary}
        </div>
        <div className="mt-4">
          <span className="font-medium">Job Type:</span> {job.jobType}
        </div>
        <div className="mt-4">
          <span className="font-medium">Industry:</span> {job.industry}
        </div>
        <div className="mt-4">
          <span className="font-medium">Application Deadline:</span> {job.applicationDeadline}
        </div>
        <div className="mt-4">
          <span className="font-medium">Status:</span> {job.status}
        </div>
        <div className="mt-4">
          <span className="font-medium">Remote:</span> {job.isRemote ? 'Yes' : 'No'}
        </div>
        <div className="mt-4">
          <span className="font-medium">Posted At:</span> {job.postedAt}
        </div>
        <div className="mt-4">
          <span className="font-medium">Updated At:</span> {job.updatedAt}
        </div>
      </div>
    </div>
  );
}
