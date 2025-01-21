import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
export default function JobTable({ jobs, onEdit, onDelete }) {
    return (
        <TableContainer component={Paper} className="border border-gray-200 shadow-none">
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell className="bg-gray-50 font-normal text-center border border-gray-200 px-4 py-2">ID</TableCell>
                        <TableCell className="bg-gray-50 font-normal text-center border border-gray-200 px-4 py-2">Title</TableCell>
                        <TableCell className="bg-gray-50 font-normal text-center border border-gray-200 px-4 py-2">Location</TableCell>
                        <TableCell className="bg-gray-50 font-normal text-center border border-gray-200 px-4 py-2">Salary</TableCell>
                        <TableCell className="bg-gray-50 font-normal text-center border border-gray-200 px-4 py-2">Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {jobs.map((job) => (
                        <TableRow key={job.id}>
                            <TableCell className="border border-gray-200 text-center px-4 py-2 font-normal">{job.id}</TableCell>
                            <TableCell className="border border-gray-200 text-center px-4 py-2 font-normal">{job.title}</TableCell>
                            <TableCell className="border border-gray-200 text-center px-4 py-2 font-normal">{job.location}</TableCell>
                            <TableCell className="border border-gray-200 text-center px-4 py-2 font-normal">{`$ ${job.salary}`}</TableCell>
                            <TableCell className="border border-gray-200 text-center px-4 py-2">
                                <div className="flex gap-4 justify-center">
                                    <Button
                                        onClick={() => onEdit(job.id)}
                                        className="bg-blue-50 text-blue-600 normal-case hover:bg-blue-100 px-4 py-1 min-w-0 shadow-none"
                                    >
                                        Update
                                    </Button>
                                    <Button
                                        onClick={() => onDelete(job.id)}
                                        className="bg-red-50 text-red-600 normal-case hover:bg-red-100 px-4 py-1 min-w-0 shadow-none"
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );

}