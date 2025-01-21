import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Paper,
} from "@mui/material";
import Link from "next/link";

const JobTable = ({ jobsSlice, onDelete, onPageChange }) => {
  const { content, number, size, totalElements, hasNext, hasPrevious } = jobsSlice;

  return (
      <TableContainer component={Paper}>
        <Table>
          {/* Table Header */}
          <TableHead>
              <TableRow>
                  <TableCell style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '18px' }}>Title</TableCell>
                  <TableCell style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '18px' }}>Location</TableCell>
                  <TableCell style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '18px' }}>Salary</TableCell>
                  <TableCell style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '18px' }}>Action</TableCell>
              </TableRow>
          </TableHead>
          <TableBody>
            {/* Table Body */}
            {content.map((job) => (
                <TableRow key={job.id}>
                  <TableCell style={{ textAlign: 'center' }}>{job.title}</TableCell>
                  <TableCell style={{ textAlign: 'center' }}>{job.location ? job.location : "-"}</TableCell>
                    <TableCell style={{textAlign: 'center'}}>{job.salary ? job.salary : "-"}</TableCell>
                    <TableCell style={{ textAlign: 'center' }}>
                    <Link href={`/edit-job/${job.id}`} passHref>
                      <Button variant="outlined" color="primary" style={{marginRight: '10px'}}>
                        Update
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

        <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: '20px',
              padding: '10px 0',
              backgroundColor: '#f9f9f9', // Optional background color for separation
              borderRadius: '8px', // Rounded edges for the container
              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', // Subtle shadow
            }}
        >
          <Button
              disabled={!hasPrevious}
              onClick={() => onPageChange(number - 1)}
              variant="outlined"
              color="primary"
              style={{
                padding: '6px 16px',
                marginRight: '10px',
                textTransform: 'none', // Makes the button text not all uppercase
                fontWeight: 'bold',
              }}
          >
            Previous
          </Button>
          <span
              style={{
                fontSize: '1rem',
                fontWeight: '500',
                margin: '0 10px',
                color: '#555', // Subtle text color
              }}
          >
    Page {number + 1} of {Math.ceil(totalElements / size)}
  </span>
          <Button
              disabled={!hasNext}
              onClick={() => onPageChange(number + 1)}
              variant="outlined"
              color="primary"
              style={{
                padding: '6px 16px',
                marginLeft: '10px',
                textTransform: 'none',
                fontWeight: 'bold',
              }}
          >
            Next
          </Button>
        </div>
      </TableContainer>
  );
};

export default JobTable;