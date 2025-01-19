"use client"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from "@mui/material/Button";
import {deleteJob, getJobs} from "@/service/service";
import {useEffect, useState} from "react";
import NotificationModal from "@components/NotificationModal";


export default function JobsTable() {
    const [jobs,setJobs]=useState([]);
    const [cnt,setCnt]=useState(false);
    const [openOrClose,setOpenOrClose]=useState(false)
    const [message,setMessage]=useState("");

    useEffect(() => {
        getJobs().then(data => setJobs(data));
    }, [cnt]);

    const handleDelete = async (id)=>{
        setOpenOrClose(false);
        await deleteJob(id).then((message)=>{
            setMessage(message);
            });
        setOpenOrClose(true);
        setCnt(!cnt);
    }
    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="large" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell align="left">Title</TableCell>
                            <TableCell align="left">Location </TableCell>
                            <TableCell align="left">Salary</TableCell>
                            <TableCell align="left">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {jobs !== undefined && jobs.map((job) => (
                            <TableRow
                                key={job.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">{job.id}</TableCell>
                                <TableCell align="left">{job.title}</TableCell>
                                <TableCell align="left">{job.location}</TableCell>
                                <TableCell align="left">{job.salary}</TableCell>
                                <TableCell align="left">
                                    <Button className="bg-green-400 w-[90px] mb-3" variant="contained" >
                                        Update
                                    </Button>
                                    <br/>
                                    <Button onClick={()=> handleDelete(job.id)} className="bg-red-400 w-[90px]" variant="contained" >
                                        Delete
                                    </Button>
                                </TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {openOrClose && <NotificationModal  message={message} />}
        </>
    );
}