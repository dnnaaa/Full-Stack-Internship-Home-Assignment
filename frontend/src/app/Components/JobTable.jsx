"use client";
import { useState } from "react";
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, responsiveFontSizes } from '@mui/material';  
import { useRouter, useSearchParams } from "next/navigation";
import { deleteJob, fetchJobs } from "../Utils/api";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function DenseTable() {

  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async ()=>{
        let response = await fetchJobs();
        setData(response);
    }

    fetchData();
  }, [data])

  const router = useRouter();


  const handleDelete = (id)=>{
        deleteJob(id).then(
          toast.error("Deleted")
        );
        
  }



  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <TableContainer component={Paper} className="shadow-xl rounded-lg">
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow className="bg-indigo-600 text-white">
              <TableCell align="center" className="font-semibold">Title</TableCell>
              <TableCell align="center" className="font-semibold">Description</TableCell>
              <TableCell align="center" className="font-semibold">Location</TableCell>
              <TableCell align="center" className="font-semibold">Salary</TableCell>
              <TableCell align="center" className="font-semibold">Posted At</TableCell>
              <TableCell align="center" className="font-semibold">Updated At</TableCell>
              <TableCell align="center" className="font-semibold">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                className="hover:bg-indigo-50"
              >
                <TableCell align="center">{row.title}</TableCell>
                <TableCell align="center">{row.description}</TableCell>
                <TableCell align="center">{row.location ? row.location : "Undefined"}</TableCell>
                <TableCell align="center">{row.salary ? row.salary : "Undefined"}</TableCell>
                <TableCell align="center">{row.postedAt}</TableCell>
                <TableCell align="center">{row.updatedAt}</TableCell>
                <TableCell align="center">
                  <Button variant="contained" color="primary" onClick={() => router.push(`/jobs/${row.id}`)}>Edit</Button> {/* Edit button */}
                  <Button variant="contained" color="primary" onClick={()=>handleDelete(row.id)}>Delete</Button> {/* Edit button */}

                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
