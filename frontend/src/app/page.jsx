'use client';

import urls from '@/services/urls';
import { AddJob } from '@/ui/job/button';
import Table from '@/ui/job/table';
import React, { useState, useEffect } from 'react';


export default function HomePage() {
    const [jobData, setJobData] = useState();  
  
    useEffect(() => {
      const fetchJobData = async () => {
        try {
          const response = await urls.getAll();
          const data = await response.data;
          setJobData(data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchJobData();
    }, []);


  return (
    <>
    <div className="max-w-full p-8">
      <div className="flex max-w-full items-center justify-between">
        <h1 className="text-2xl">Job list</h1>
        <AddJob />
      </div>
        <Table jobData={jobData} />
    </div>
    </>
  );
}
