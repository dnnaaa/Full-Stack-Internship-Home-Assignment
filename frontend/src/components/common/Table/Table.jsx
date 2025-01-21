import { Table as MuiTable, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material"

export function Table({ headers, children }) {
  return (
    <TableContainer component={Paper} className="rounded-xl overflow-hidden">
      <MuiTable>
        <TableHead className="bg-gray-50">
          <TableRow>
            {headers.map((header, index) => (
              <TableCell key={index} className="font-semibold text-gray-900">
                {header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>{children}</TableBody>
      </MuiTable>
    </TableContainer>
  )
}

