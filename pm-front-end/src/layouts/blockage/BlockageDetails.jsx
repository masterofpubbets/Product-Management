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
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
// components
import Iconify from "src/components/iconify";
import Scrollbar from "src/components/scrollbar";
import { TableHeadCustom } from "src/components/table";
import { format } from "date-fns";
import CustomPopover, { usePopover } from "src/components/custom-popover";
// ----------------------------------------------------------------------

export default function BlockageDetails({ tableData, showButton, handleFind }) {

  const getLabels = () => {
    return [
      { id: "Tag", label: "Tag" },
      { id: "GroupName", label: "Group Name" },
      { id: "Discipline", label: "Discipline" },
      { id: "Type", label: "Type" },
      { id: "Description", label: "Description" },
      { id: "Blockage", label: "Blockage" },
      { id: "Category", label: "Category" },
      { id: "CreatedDate", label: "Created Date" },
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
                <BlockageDetailsRow key={index} row={row} handleFind={handleFind}/>
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

function BlockageDetailsRow({ row, handleFind }) {
  const popover = usePopover();

  const handleFindItem = () => {
    popover.onClose();
    handleFind(row.Tag);
  };

  const handleDelete = () => {
    popover.onClose();
    
  };

  return (
    <>
      <TableRow key={row.index}>
        <TableCell variant="soft">
          <Typography variant="subtitle2">{row.Tag}</Typography>
        </TableCell>

        <TableCell>
          <Typography variant="subtitle2">{row.GroupName}</Typography>
        </TableCell>

        <TableCell>
          <Typography variant="subtitle2">{row.Discipline}</Typography>
        </TableCell>

        <TableCell>
          <Typography variant="subtitle2">{row.Type}</Typography>
        </TableCell>

        <TableCell>
          <Typography variant="subtitle2">{row.Description}</Typography>
        </TableCell>

        <TableCell>
          <Typography variant="subtitle2" color="error">
            {row.Blockage}
          </Typography>
        </TableCell>

        <TableCell>
          <Typography variant="subtitle2">{row.Category}</Typography>
        </TableCell>

        <TableCell>
          <Typography variant="subtitle2">
            {formatDate(row.CreatedDate)}
          </Typography>
        </TableCell>

        <TableCell align="right" sx={{ pr: 1 }}>
          <IconButton
            color={popover.open ? "inherit" : "default"}
            onClick={popover.onOpen}
          >
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 160 }}
      >
        <MenuItem onClick={handleFindItem} sx={{ color: "primary.main" }}>
          <Iconify icon="material-symbols:find-in-page-outline" />
          Find in Model
        </MenuItem>

        <Divider sx={{ borderStyle: "dashed" }} />

        <MenuItem onClick={handleDelete} sx={{ color: "error.main" }}>
          <Iconify icon="solar:trash-bin-trash-bold" />
          Delete
        </MenuItem>
      </CustomPopover>
    </>
  );
}

BlockageDetailsRow.propTypes = {
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
