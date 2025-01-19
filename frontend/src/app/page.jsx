"use client"
import JobsTable from "@components/JobsTable";
import Button from '@mui/material/Button';
import {useEffect, useState} from "react";
import Link from "next/link";
export default function HomePage() {
    const [jobs,setJobs]=useState([])
    useEffect(() => {
        getJobs().then(data => setJobs(data));
    }, []);
  return (
      <div className='flex  items-center justify-center h-screen bg-gray-50'>
          <div>
              <div className="flex items-center justify-between">
                  <h1>Jobs List</h1>
                      <Link href="add" >
                          <Button variant="contained" color="success">
                                Add Job
                          </Button>
                          </Link>
              </div>
              <JobsTable jobs={jobs}/>
          </div>

      </div>
  );
}



const getJobs = async () => {
    const url = 'http://localhost:8080/jobs';

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data with fetch:', error);
        return [];
    }
};



