import React from 'react';
import { TableCell, TableRow } from '@mui/material';

/**
 * TableEmpty Component
 * Displays a placeholder row in a table when no data is available.
 *
 * @returns {JSX.Element} A table row with a message indicating no data is available.
 */
const TableEmpty = () => {
  return (
    <TableRow>
      {/* Table cell spans all columns in the table */}
      <TableCell colSpan={4} className="text-center text-gray-300">
        No jobs available.
      </TableCell>
    </TableRow>
  );
};

export default TableEmpty;
