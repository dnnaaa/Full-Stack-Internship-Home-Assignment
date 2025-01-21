import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Box,
  Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const JobsTable = ({ jobs, onEdit, onDelete }) => {
  if (jobs.length == 0) {
    return (
      <Box
        sx={{
          backgroundColor: 'rgba(0, 0, 0, 0.08)',
          p: 3,
          textAlign: 'center',
          borderRadius: 1,
          mt: 2,
        }}>
        <Typography variant='body1'>No jobs available</Typography>
      </Box>
    );
  }
  return (
    <TableContainer
      component={Paper}
      sx={{
        boxShadow: 3,
        '& .MuiTableCell-root': {
          borderColor: 'rgba(0, 0, 0, 0.12)',
          borderRight: '1px solid rgba(0, 0, 0, 0.12)',
        },
        '& .MuiTableCell-root:last-child': {
          borderRight: 'none',
        },
      }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold' }}>ID</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Title</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Location</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Salary</TableCell>
            <TableCell align='right' sx={{ fontWeight: 'bold' }}>
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {jobs?.map((job, index) => (
            <TableRow
              key={job.id}
              sx={{ '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' } }}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{job.title}</TableCell>
              <TableCell>{job.location}</TableCell>
              <TableCell>{job.salary} $</TableCell>
              <TableCell align='right'>
                <IconButton onClick={() => onEdit(job.id)}>
                  <EditIcon sx={{ color: '#1976d2' }} />
                </IconButton>
                <IconButton onClick={() => onDelete(job.id)}>
                  <DeleteIcon sx={{ color: '#d32f2f' }} />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default JobsTable;
