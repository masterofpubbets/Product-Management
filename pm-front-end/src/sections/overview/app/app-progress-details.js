import PropTypes from "prop-types";
// @mui
import Box from "@mui/material/Box";
import Stack from '@mui/material/Stack';
import Table from "@mui/material/Table";
import Divider from "@mui/material/Divider";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Unstable_Grid2";
import Card from "@mui/material/Card";
import TableContainer from "@mui/material/TableContainer";
// components
import Scrollbar from "src/components/scrollbar";
import { TableHeadCustom } from "src/components/table";
import { format } from "date-fns";
// ----------------------------------------------------------------------

export default function ProgressDetails({
  title,
  subheader,
  tableData,
  discipline,
}) {


  const getLabels = () => {
    switch (discipline) {
      case "Civil":
        return [
          { id: "Tag", label: "Tag" },
          { id: "GroupName", label: "Group Name" },
          { id: "DoneDate", label: "Done Date" },
          { id: "Status", label: "Status" },
          { id: "" },
        ];
      case "Electrical":
        return [
          { id: "Tag", label: "Tag" },
          { id: "GroupName", label: "Group Name" },
          { id: "PulledDate", label: "Pulled Date" },
          { id: "ConnectedDate", label: "Connected Date" },
          { id: "TestedDate", label: "Tested Date" },
          { id: "Status", label: "Status" },
          { id: "" },
        ];
      case "Mechanical":
        return [
          { id: "Tag", label: "Tag" },
          { id: "GroupName", label: "Group Name" },
          { id: "ErectedDate", label: "Erected Date" },
          { id: "Status", label: "Status" },
          { id: "" },
        ];
      case "Piping":
        return [
          { id: "Tag", label: "Tag" },
          { id: "GroupName", label: "Group Name" },
          { id: "FabricationDate", label: "Fabrication Date" },
          { id: "ErectedDate", label: "Erected Date" },
          { id: "WeldedDate", label: "Welded Date" },
          { id: "TestedDatee", label: "Tested Date" },
          { id: "FlushedDate", label: "Flushed Date" },
          { id: "Status", label: "Status" },
          { id: "" },
        ];
      case "Steel Structure":
        return [
          { id: "Tag", label: "Tag" },
          { id: "GroupName", label: "Group Name" },
          { id: "FabricationDate", label: "Fabrication Date" },
          { id: "DeliverDate", label: "Deliver Date" },
          { id: "ErectedDate", label: "Erected Date" },
          { id: "Status", label: "Status" },
          { id: "" },
        ];
        Default: return [];
    }
  };

  const renderLegend = () => {
    switch (discipline) {
      case "Civil":
        return <Stack
            spacing={1}
            direction="row"
            sx={{
              typography: 'subtitle2',
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                width: 16,
                height: 16,
                bgcolor: '#4caf50',
                borderRadius: 0.75,
                marginLeft: 2
              }}
            />
            <Box sx={{ color: 'text.secondary' }}>Done</Box>

          </Stack>
      case "Electrical":
        return <Stack
            spacing={1}
            direction="row"
            sx={{
              typography: 'subtitle2',
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                width: 16,
                height: 16,
                bgcolor: '#4caf50',
                borderRadius: 0.75,
                marginLeft: 2
              }}
            />
            <Box sx={{ color: 'text.secondary' }}>Pulled</Box>

            <Box
              sx={{
                width: 16,
                height: 16,
                bgcolor: '#2196f3',
                borderRadius: 0.75,
                marginLeft: 2
              }}
            />
            <Box sx={{ color: 'text.secondary' }}>Connected</Box>

            <Box
              sx={{
                width: 16,
                height: 16,
                bgcolor: '#ff5722',
                borderRadius: 0.75,
                marginLeft: 2
              }}
            />
            <Box sx={{ color: 'text.secondary' }}>Tested</Box>

          </Stack>
      case "Mechanical":
        return <Stack
            spacing={1}
            direction="row"
            sx={{
              typography: 'subtitle2',
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                width: 16,
                height: 16,
                bgcolor: '#4caf50',
                borderRadius: 0.75,
                marginLeft: 2
              }}
            />
            <Box sx={{ color: 'text.secondary' }}>Erected</Box>

          </Stack>
      case "Piping":
        return <Stack
            spacing={1}
            direction="row"
            sx={{
              typography: 'subtitle2',
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                width: 16,
                height: 16,
                bgcolor: '#ffeb3b',
                borderRadius: 0.75,
                marginLeft: 2
              }}
            />
            <Box sx={{ color: 'text.secondary' }}>Fabricated</Box>

            <Box
              sx={{
                width: 16,
                height: 16,
                bgcolor: '#4caf50',
                borderRadius: 0.75,
                marginLeft: 2
              }}
            />
            <Box sx={{ color: 'text.secondary' }}>Erected</Box>

            <Box
              sx={{
                width: 16,
                height: 16,
                bgcolor: '#ff9800',
                borderRadius: 0.75,
                marginLeft: 2
              }}
            />
            <Box sx={{ color: 'text.secondary' }}>Welded</Box>

            <Box
              sx={{
                width: 16,
                height: 16,
                bgcolor: '#ff5722',
                borderRadius: 0.75,
                marginLeft: 2
              }}
            />
            <Box sx={{ color: 'text.secondary' }}>Tested</Box>

            <Box
              sx={{
                width: 16,
                height: 16,
                bgcolor: '#2196f3',
                borderRadius: 0.75,
                marginLeft: 2
              }}
            />
            <Box sx={{ color: 'text.secondary' }}>Flushed</Box>

          </Stack>
      case "Steel Structure":
        return <Stack
            spacing={1}
            direction="row"
            sx={{
              typography: 'subtitle2',
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                width: 16,
                height: 16,
                bgcolor: '#ffeb3b',
                borderRadius: 0.75,
                marginLeft: 2
              }}
            />
            <Box sx={{ color: 'text.secondary' }}>Fabricated</Box>

            <Box
              sx={{
                width: 16,
                height: 16,
                bgcolor: '#ea00cd',
                borderRadius: 0.75,
                marginLeft: 2
              }}
            />
            <Box sx={{ color: 'text.secondary' }}>Delivered</Box>

            <Box
              sx={{
                width: 16,
                height: 16,
                bgcolor: '#4caf50',
                borderRadius: 0.75,
                marginLeft: 2
              }}
            />
            <Box sx={{ color: 'text.secondary' }}>Erected</Box>

          </Stack>
      default:
        return null
    }
  };

  return (
    <Card>
      <CardHeader title={title} subheader={subheader} sx={{ mb: 3 }} />
      <Grid xs={12} lg={12} md={12}>
        {renderLegend()}
      </Grid>
       {
        discipline !== "Default" &&
        <TableContainer sx={{ overflow: "unset" }}>
        <Scrollbar>
          <Table sx={{ minWidth: 680 }}>
            <TableHeadCustom headLabel={getLabels()} />

            <TableBody>
              {tableData.map((row, index) => (
                <ProgressDetailsRow
                  key={index}
                  row={row}
                  discipline={discipline}
                />
              ))}
            </TableBody>
          </Table>
        </Scrollbar>
      </TableContainer>
      }
      

      <Divider sx={{ borderStyle: "dashed" }} />
    </Card>
  );
}

ProgressDetails.propTypes = {
  subheader: PropTypes.string,
  tableData: PropTypes.array,
  tableLabels: PropTypes.array,
  title: PropTypes.string,
};

// ----------------------------------------------------------------------

function ProgressDetailsRow( {row, discipline} ) {
  
  switch (discipline) {
    case "Civil":
      return ProgressCivilDetailsRow(row);
      break 
    case "Electrical":
      return ProgressEleDetailsRow(row);
      break 
    case "Mechanical":
      return ProgressMecDetailsRow(row);
      break 
    case "Piping":
      return ProgressPipingDetailsRow(row);
      break 
    case "Steel Structure":
      return ProgressSSDetailsRow(row);
      break 
    Default: return null;
  }
};

ProgressDetailsRow.propTypes = {
  row: PropTypes.object,
};

function ProgressCivilDetailsRow( row ) {

  return (
    <>
      <TableRow>
        <TableCell>{row.Tag}</TableCell>
        <TableCell>{row.GroupName}</TableCell>
        <TableCell>{formatDate(row.DoneDate)}</TableCell>
        <TableCell sx={{color: statusColor(row.Status)}}>{row.Status}</TableCell>
      </TableRow>
    </>
  );
}

ProgressCivilDetailsRow.propTypes = {
  row: PropTypes.object,
};

function ProgressEleDetailsRow( row ) {
  return (
    <>
      <TableRow>
        <TableCell>{row.Tag}</TableCell>
        <TableCell>{row.GroupName}</TableCell>
        <TableCell>{formatDate(row.PulledDate)}</TableCell>
        <TableCell>{formatDate(row.ConnectedDate)}</TableCell>
        <TableCell>{formatDate(row.TestedDate)}</TableCell>
        <TableCell sx={{color: statusColor(row.Status)}}>{row.Status}</TableCell>
      </TableRow>
    </>
  );
}

ProgressEleDetailsRow.propTypes = {
  row: PropTypes.object,
};

function ProgressMecDetailsRow( row ) {
  return (
    <>
      <TableRow>
        <TableCell>{row.Tag}</TableCell>
        <TableCell>{row.GroupName}</TableCell>
        <TableCell>{formatDate(row.ErectedDate)}</TableCell>
        <TableCell sx={{color: statusColor(row.Status)}}>{row.Status}</TableCell>
      </TableRow>
    </>
  );
}

ProgressMecDetailsRow.propTypes = {
  row: PropTypes.object,
};

function ProgressPipingDetailsRow ( row ) {
  
  return (
    <>
      <TableRow>
        <TableCell>{row.Tag}</TableCell>
        <TableCell>{row.GroupName}</TableCell>
        <TableCell>{formatDate(row.FabricationDate)}</TableCell>
        <TableCell>{formatDate(row.ErectedDate)}</TableCell>
        <TableCell>{formatDate(row.WeldedDate)}</TableCell>
        <TableCell>{formatDate(row.TestedDate)}</TableCell>
        <TableCell>{formatDate(row.FlushedDate)}</TableCell>
        <TableCell sx={{color: statusColor(row.Status)}}>{row.Status}</TableCell>
      </TableRow>
    </>
  );
}

ProgressPipingDetailsRow.propTypes = {
  row: PropTypes.object,
};

function ProgressSSDetailsRow( row ) {
  return (
    <>
      <TableRow>
        <TableCell>{row.Tag}</TableCell>
        <TableCell>{row.GroupName}</TableCell>
        <TableCell>{formatDate(row.FabricationDate)}</TableCell>
        <TableCell>{formatDate(row.DeliverDate)}</TableCell>
        <TableCell>{formatDate(row.ErectedDate)}</TableCell>
        <TableCell sx={{color: statusColor(row.Status)}}>{row.Status}</TableCell>
      </TableRow>
    </>
  );
}

ProgressSSDetailsRow.propTypes = {
  row: PropTypes.object,
};


const formatDate = (value) => {
  if (value !== undefined) {
    return (format(new Date(value), "dd/MM/yyyy") === '01/01/1970' ? '' : format(new Date(value), "dd/MM/yyyy"))
  } else {
    return value
  }
};


function statusColor (itemStatus) {
    switch (itemStatus) {
      case "Done":
        return '#00af00'
      case "Tested":
        return '#ff0000'
      case "Connected":
        return '#009688'
      case "Pulled":
        return '#4caf50'
      case "Erected":
        return '#00ff50'
      case "Delivered":
        return '#ea00cd'
      case "Fabricated":
        return '#ffeb3b'
      case "Flushed":
        return '#2196f3'
      case "Welded":
        return '#ff9800'
      default:
        return {red: 255, green: 255, blue: 255, alpha: 1}
    }
  };