import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from "@mui/material/Button";
import { deleteJob, getJobs } from "@/service/service";
import { useEffect, useState } from "react";
import NotificationModal from "@components/NotificationModal";
import Link from "next/link";

export default function JobsTable() {
    const [jobs, setJobs] = useState([]);
    const [cnt, setCnt] = useState(false);
    const [openOrClose, setOpenOrClose] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        getJobs().then(data => setJobs(data));
    }, [cnt]);

    const handleDelete = async (id) => {
        setOpenOrClose(false);
        await deleteJob(id).then((message) => {
            setMessage(message);
        });
        setOpenOrClose(true);
        setCnt(!cnt);
    };

    return (
        <>
            <TableContainer component={Paper} className="w-[500px] sm:w-full ">
                <Table sx={{ minWidth: 650 }} size="medium" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell align="left">Title</TableCell>
                            <TableCell align="left">Location </TableCell>
                            <TableCell align="left">Salary</TableCell>
                            <TableCell align="center">Actions</TableCell>
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
                                <TableCell align="left">
                                    {job.salary !== null ? `$${job.salary}` : ''}
                                </TableCell>
                                <TableCell align="left">
                                    <div className="flex flex-col items-start justify-center gap-y-3 sm:flex-row">
                                        <Link href={`/edit/${job.id}`}>
                                            <Button className="bg-green-400 w-[90px]" variant="contained">
                                                Update
                                            </Button>
                                        </Link>
                                        <Button onClick={() => handleDelete(job.id)} className="sm:ml-3 bg-red-400 w-[90px]" variant="contained">
                                            Delete
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {openOrClose && <NotificationModal message={message} />}
        </>
    );
}
