import { useEffect, useState } from "react"
import { getAllJobs } from "../services/jobs-service";
import { NavLink } from "react-router-dom";
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Job } from "../types";

const Jobs = () => {
    const [jobs, setJobs] = useState<Job[]>();
    useEffect(() => {
        const fetchJobs = async () => {
            const jobsResult = await getAllJobs();
            setJobs(jobsResult);
            console.log(jobsResult);
        }
        fetchJobs();
    }, [])
    return (
        <div className="">
            <div className="flex justify-between items-center mb-8 mt-6">
                <h1 className="text-2xl font-semibold">Jobs list</h1>
                <NavLink to="/job/">
                    <Button variant="contained" size="small" className="capitalize" color="primary">New job</Button>
                </NavLink>
            </div>
            <TableContainer className="border rounded-lg" >
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
                        {jobs?.map((job) => (
                            <TableRow key={job.id} className="[&:last-child>td]:border-b-0">
                                <TableCell>{job.title}</TableCell>
                                <TableCell>{job.location}</TableCell>
                                <TableCell>${job.salary}</TableCell>
                                <TableCell className="flex gap-1">
                                    <NavLink to={`/job/${job.id}/`}>
                                        <IconButton size="small" className="">
                                            <EditIcon />
                                        </IconButton>
                                    </NavLink>
                                    <IconButton size="small">
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}
export default Jobs