import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";

export default function TableComponent({ columns, rows, title }) {
  return (
    <div>
      <p className="font-bold">{title}</p>
      <div style={{ height: 400, width: "600px" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          {...(!rows[0]?.id && { getRowId: (row) => row.jobTitle })}
        />
      </div>
    </div>
  );
}
