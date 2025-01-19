"use client"
import JobsTable from "@components/JobsTable";
import Button from '@mui/material/Button';
import Link from "next/link";

export default function HomePage() {
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
              <JobsTable/>
          </div>

      </div>
  );
}







