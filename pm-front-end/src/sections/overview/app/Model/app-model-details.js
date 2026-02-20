import PropTypes from "prop-types";
// @mui
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import CardHeader from "@mui/material/CardHeader";
import Card from "@mui/material/Card";
import TableContainer from "@mui/material/TableContainer";
// components
import Iconify from "src/components/iconify";
import Scrollbar from "src/components/scrollbar";
import Label from "src/components/label";
import { TableHeadCustom } from "src/components/table";

// ----------------------------------------------------------------------

export default function ModelDetails({
  title,
  subheader,
  tableData,
  tableLabels,
  showButton,
  ...other
}) {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} sx={{ mb: 3 }} />

      <TableContainer sx={{ overflow: "unset" }}>
        <Scrollbar>
          <Table sx={{ minWidth: 680 }} size="small">
            <TableHeadCustom headLabel={tableLabels} />

            <TableBody>
              {tableData.map((row, index) => (
                <ModelDetailsRow key={index} row={row} />
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

ModelDetails.propTypes = {
  subheader: PropTypes.string,
  tableData: PropTypes.array,
  tableLabels: PropTypes.array,
  title: PropTypes.string,
};

// ---------------------------------------------------------------------

function ModelDetailsRow({ row }) {
  return (
    <>
      <TableRow key={row.index}>
        <TableCell >
          <Label
            variant="soft"
            color={row.header === "Name" ? "warning" : "info"}
          >
            {row.header}
          </Label>
        </TableCell>
        <TableCell >
          <Label
            variant="soft"
            color={row.header === "Name" ? "warning" : "info"}
          >
            {row.value}
          </Label>
        </TableCell>
      </TableRow>
    </>
  );
}

ModelDetailsRow.propTypes = {
  row: PropTypes.object,
};
