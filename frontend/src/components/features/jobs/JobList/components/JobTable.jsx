import { TableRow, TableCell, IconButton, Tooltip, Typography } from "@mui/material"
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material"
import Link from "next/link"
import { Table } from "@/components/common/Table/Table"

export default function JobTable({ jobs, onDelete }) {
  const headers = ["Title", "Location", "Salary", "Actions"]

  return (
    <Table headers={headers}>
      {jobs.map((job) => (
        <TableRow key={job.id} className="hover:bg-gray-50 transition-all">
          <TableCell>
            <Typography variant="subtitle1" className="text-gray-900 font-medium">
              {job.title}
            </Typography>
          </TableCell>
          <TableCell className="text-gray-700">{job.location}</TableCell>
          <TableCell className="text-gray-700">${job.salary.toFixed(2)}</TableCell>
          <TableCell>
            <div className="flex space-x-2">
              <Link href={`/edit-job/${job.id}`} passHref>
                <Tooltip title="Edit">
                  <IconButton className="text-gray-600 hover:text-blue-600 transition-all">
                    <EditIcon />
                  </IconButton>
                </Tooltip>
              </Link>
              <Tooltip title="Delete">
                <IconButton
                  onClick={() => onDelete(job.id)}
                  className="text-gray-600 hover:text-red-600 transition-all"
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </div>
          </TableCell>
        </TableRow>
      ))}
    </Table>
  )
}

