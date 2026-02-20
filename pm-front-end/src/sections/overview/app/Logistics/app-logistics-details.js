import PropTypes from "prop-types";
// @mui
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";
import TableContainer from "@mui/material/TableContainer";
// components
import Iconify from "src/components/iconify";
import Scrollbar from "src/components/scrollbar";
import Label from "src/components/label";
import { TableHeadCustom } from "src/components/table";
import { format } from "date-fns";
// ----------------------------------------------------------------------

export default function LogisticsDetails({
  tableData,
  showButton,
}) {
  const getLabels = () => {
    return [
      { id: "Tag", label: "Tag" },
      { id: "ForecastDate", label: "Forecast Date" },
      { id: "ArrivedDate", label: "Arrived Date" },
      { id: "Country", label: "Country" },
      { id: "City", label: "City" },
      { id: "Status", label: "Status" },
      { id: "" },
    ];
  };

  return (
    <>
      <TableContainer sx={{ overflow: "unset" }}>
        <Scrollbar>
          <Table sx={{ minWidth: 680 }} size="small">
            <TableHeadCustom headLabel={getLabels()} />

            <TableBody>
              {tableData.map((row, index) => (
                <LogisticsDetailsRow key={index} row={row} />
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
    </>
  );
}

// ---------------------------------------------------------------------

function LogisticsDetailsRow({ row }) {
  return (
    <>
      <TableRow key={row.index}>
        <TableCell variant="soft">
          <Typography variant="subtitle2">{row.Tag}</Typography>
        </TableCell>

        <TableCell>
          <Typography variant="subtitle2">
            {formatDate(row.ForecastDate)}
          </Typography>
        </TableCell>

        <TableCell>
          <Typography variant="subtitle2">
            {formatDate(row.ArrivedDate)}
          </Typography>
        </TableCell>

        <TableCell>
          <Typography variant="subtitle2">{row.Country}</Typography>
        </TableCell>

        <TableCell>
          <Typography variant="subtitle2">{row.City}</Typography>
        </TableCell>

        <TableCell>
          <Label
            variant="soft"
            color={row.Status === "On Shipment" ? "warning" : "info"}
          >
            {row.Status}
          </Label>
        </TableCell>
      </TableRow>
    </>
  );
}

LogisticsDetailsRow.propTypes = {
  row: PropTypes.object,
};

const formatDate = (value) => {
  if (value !== undefined) {
    return format(new Date(value), "dd/MM/yyyy") === "01/01/1970"
      ? ""
      : format(new Date(value), "dd/MM/yyyy");
  } else {
    return value;
  }
};
