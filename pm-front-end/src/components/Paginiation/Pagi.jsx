import Pagination from "@mui/material/Pagination";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";

import { useState } from "react";

export default function Pagi({handlePageClick, rowPerPage, pageCount, handleSelectChange}) {
    const [rowPP, setRowPP] = useState(rowPerPage === undefined ? 50 : rowPerPage)

    const handleListSelectChange = (e) => {
        handleSelectChange(e.target.value);
        setRowPP(e.target.value);
    };

  return (
    <>
      <Stack
        direction="row"
        spacing={2}
        sx={{
          justifyContent: "flex-end",
          alignItems: "center",
          marginBottom: 2,
          marginTop: 2,
        }}
      >
        <Select                     
          labelId="demo-select-small-label"
          id="demo-select-small"
          value={rowPP}
          label="Row Per Page"
          onChange={handleListSelectChange}
        >
            {
                [10, 20, 30, 50, 100].map(i => {
                    return <MenuItem key={i} value={i}>{i}</MenuItem>
                })
            }
        </Select>

        <Pagination onChange={handlePageClick} count={pageCount} color="primary" />
      </Stack>
    </>
  );
}
