import { useEffect, useState } from "react"
import { getAllJobs } from "../services/jobs-service";
import { NavLink } from "react-router-dom";
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button, IconButton, Snackbar, Slide, } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Job } from "../types";
import { deleteJob } from "../services/jobs-service";
import Dialog from "../components/Dialog";


const Jobs = () => {
    const [jobs, setJobs] = useState<Job[]>();
    const [openDialog, setOpenDialog] = useState(false);
    const [jobToDelete, setJobToDelete] = useState<number | null>(null);
    type Severity = 'success' | 'error';
    const [snackbar, setSnackbar] = useState<{
        open: boolean;
        message: string;
        severity: Severity;
    }>({
        open: false,
        message: '',
        severity: 'success'
    });

    useEffect(() => {
        const fetchJobs = async () => {
            const jobsResult = await getAllJobs();
            setJobs(jobsResult);
            console.log(jobsResult);
        }
        fetchJobs();
    }, []);


    // Delete job dialog functions
    const handleDeleteClick = (jobId: number) => {
        setJobToDelete(jobId);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setJobToDelete(null);
    };

    // Delete job 
    const handleConfirmDelete = async () => {
        if (jobToDelete) {
            await deleteJob(jobToDelete);
            const updatedJobs = await getAllJobs();
            setJobs(updatedJobs);
            handleCloseDialog();
            setSnackbar({
                open: true,
                message: "Job deleted successfully",
                severity: 'success'
            });
        }
    };

    return (
        <div className="">
            <div className="flex justify-between items-center mb-8 mt-6">
                <h1 className="text-2xl font-semibold">Jobs list</h1>
                <NavLink to="/job/">
                    <Button variant="contained" size="small" className="capitalize" color="primary">New job</Button>
                </NavLink>
            </div>
            {/* Jobs table */}
            {
                jobs && jobs.length > 0 ?
                    <TableContainer className="border rounded-md" >
                        <Table>
                            <TableHead className="[&>tr>th]:py-2 [&>tr>th]:border-b [&>tr>th]:border-gray-200 ">
                                <TableRow>
                                    <TableCell>Title</TableCell>
                                    <TableCell>Location</TableCell>
                                    <TableCell>Salary</TableCell>
                                    <TableCell></TableCell>
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
                                                <IconButton size="small" >
                                                    <EditIcon />
                                                </IconButton>
                                            </NavLink>
                                            <IconButton size="small" onClick={() => handleDeleteClick(job.id)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    :
                    // No jobs found
                    <div className="flex flex-col justify-center items-center h-[50vh] gap-4">
                        <h1 className="text-2xl font-semibold">No jobs found</h1>
                        <NavLink to="/job/">
                            <Button variant="contained" size="small" className="capitalize" color="primary">Add new job</Button>
                        </NavLink>
                    </div>
            }
            {/* Delete job dialog */}
            <Dialog
                openDialog={openDialog}
                handleCloseDialog={handleCloseDialog}
                handleConfirmDelete={handleConfirmDelete}
            />

            <Snackbar
                autoHideDuration={2000}
                open={snackbar.open}
                message={snackbar.message}
                onClose={() => setSnackbar({ open: false, message: '', severity: 'success' })}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                TransitionComponent={Slide}
            />
        </div>
    )
}
export default Jobs