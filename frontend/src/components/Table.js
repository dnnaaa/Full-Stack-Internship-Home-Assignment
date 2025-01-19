import React from 'react';
import {
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

const Table = ({ columns, data, renderActions }) => {
    return (
      <TableContainer component={Paper} className="bg-gray-800 shadow-lg overflow-x-auto">
        <MuiTable>
        <TableHead className="bg-gray-700">
          <TableRow>
            {columns.map((col) => (
              <TableCell key={col} className="text-gray-300 font-medium">
                {col}
              </TableCell>
            ))}
            {renderActions && <TableCell className="text-gray-300 font-medium">Actions</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index} className="hover:bg-gray-700">
              {Object.values(row).map((value, i) => (
                <TableCell key={i} className="text-gray-300">
                  {value}
                </TableCell>
              ))}
              {renderActions && (
                <TableCell>
                  {renderActions(row)}
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </MuiTable>
    </TableContainer>
  );
};

export default Table;
