import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Paper } from "@mui/material";
import Link from "next/link";

const JobTable = ({ jobs, onDelete }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Salary</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {jobs.map((job) => (
            <TableRow key={job.id}>
              <TableCell>{job.title}</TableCell>
              <TableCell>{job.location}</TableCell>
              <TableCell>{job.salary}</TableCell>
              <TableCell>
                <Link href={`/edit-job/${job.id}`} passHref>
                  <Button variant="outlined" color="primary">
                    Edit
                  </Button>
                </Link>
                <Button
                  onClick={() => onDelete(job.id)}
                  variant="outlined"
                  color="secondary"
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default JobTable;
