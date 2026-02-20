import * as React from 'react';
import PropTypes from "prop-types";
// @mui
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import Card from "@mui/material/Card";
import TableContainer from "@mui/material/TableContainer";
// components
import Iconify from "src/components/iconify";
import Scrollbar from "src/components/scrollbar";
import CustomPopover, { usePopover } from "src/components/custom-popover";
import { TableHeadCustom } from "src/components/table";

// ----------------------------------------------------------------------

export default function HeavyLiftingDetails({
  title,
  subheader,
  tableData,
  tableLabels,
  showButton,
  ...other
}) {


  return (
    <Card {...other}>

        <TableContainer sx={{ overflow: 'unset' }}>
          <Scrollbar>
            <Table sx={{ minWidth: 680, tableLayout: "fixed" }}>
              <TableHeadCustom headLabel={tableLabels} />

              <TableBody>
                {tableData.map((row, index) => (
                  <HeavyLiftingRow key={index} row={row} />
                ))}
              </TableBody>
            </Table>
          </Scrollbar>
        </TableContainer>

      <Divider sx={{ borderStyle: "dashed" }} />

      {showButton && (
        <Box sx={{ p: 2, textAlign: "right" }}>
          <Button
            size="small"
            color="inherit"
            endIcon={
              <Iconify
                icon="eva:arrow-ios-forward-fill"
                width={18}
                sx={{ ml: -0.5 }}
              />
            }
          >
            View All
          </Button>
        </Box>
      )}
    </Card>
  );
}

HeavyLiftingDetails.propTypes = {
  subheader: PropTypes.string,
  tableData: PropTypes.array,
  tableLabels: PropTypes.array,
  title: PropTypes.string,
};

// ----------------------------------------------------------------------

function HeavyLiftingRow({ row }) {
  const popover = usePopover();

  const handleFind = () => {
    popover.onClose();
    console.info("Find", row.id);
  };

  return (
    <>
      <TableRow>
        <TableCell>{row.Category}</TableCell>
        <TableCell>{row.CraneType}</TableCell>
        <TableCell>{row.Equipment}</TableCell>
        <TableCell>{row.Start}</TableCell>
        <TableCell>{row.Weight}</TableCell>
        <TableCell>{row.Height}</TableCell>
      </TableRow>

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 160 }}
      >
        <MenuItem onClick={handleFind}>
          <Iconify icon="eva:cloud-download-fill" />
          Find
        </MenuItem>
      </CustomPopover>
    </>
  );
}

HeavyLiftingRow.propTypes = {
  row: PropTypes.object,
};
