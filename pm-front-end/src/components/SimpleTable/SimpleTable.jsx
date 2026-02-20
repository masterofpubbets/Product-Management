import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';



export default function SimpleTable({ columns, rows, pageSize }) {
  return (
    <Box sx={{ height: '95%', width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: pageSize === undefined ? 10 : pageSize ,
            },
          },
        }}
        pageSizeOptions={[5, 10, 20, 50, 100]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}
