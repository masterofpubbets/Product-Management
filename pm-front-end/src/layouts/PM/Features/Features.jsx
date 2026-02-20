import { useState, useEffect, useCallback, forwardRef } from "react";
import { useNavigate  } from 'react-router-dom';
import isEqual from 'lodash/isEqual';
// @mui
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import IconButton from '@mui/material/IconButton';
import TableContainer from '@mui/material/TableContainer';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Snackbar from '@mui/material/Snackbar';
import Box from "@mui/material/Box";
//
import { paths } from 'src/routes/paths';
// components
import { useSettingsContext } from "src/components/settings";
import {
  useTable,
  getComparator,
  emptyRows,
  TableNoData,
  TableSkeleton,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedAction,
  TablePaginationCustom,
} from "src/components/table";
import Iconify from "src/components/iconify";
import Scrollbar from "src/components/scrollbar";
import CustomBreadcrumbs from "src/components/custom-breadcrumbs";
//
import FeaturesTableRow from "./features-table-row";
import FeaturesTableToolbar from "./features-table-toolbar";
import FeaturesTableFiltersResult from "./features-table-filter-result";
import CustomChart from 'src/components/Charts/CustomChart';
// Hooks
import { useXlsx } from "src/hooks/useXlsx";
import {useFeatures} from "src/hooks/useFeatures";
import {useProduct} from "src/hooks/useProducts";
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "name", label: "Name" },
  { id: "time_to_use", label: "Time to Use", width: 150 },
  { id: "num_of_use", label: "Number of Users", width: 150 },
  { id: "kano", label: "Kano"},
  { id: "moscow", label: "Moscow"},
  { id: "status", label: "status"},
  { id: "current", label: "Developed"},
  { id: "initiative", label: "Initiative"},
  { id: "", width: 88 },
];

const defaultFilters = {
  name: "",
  filter1: [],
  filter2: []
};

const filter1Name = "Kano"
const filter2Name = "Moscow"

const filter1ColumnName = "kano"
const filter2ColumnName = "moscow"

export default function Features() {
  const navigate = useNavigate();
  const table = useTable();
  const settings = useSettingsContext();
  const [tableData, setTableData] = useState([]);
  const [filters, setFilters] = useState(defaultFilters);
  const {features, getFeatures, featureEmpty, featureLoading, deleteFt} = useFeatures();
  const {selectedProduct} = useProduct();
  const [filter1, setFilter1] = useState([{value: '', label: ''}])
  const [filter2, setFilter2] = useState([{value: '', label: ''}])
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const {writeFile} = useXlsx();
  const [snakeOpen, setSnakeOpen] = useState(false);
  const [snakeMessage, setSnakeMessage] = useState('')
  const [chartData, setChartData] = useState([]);
  const [chartData2, setChartData2] = useState([]);
  const [chartData3, setChartData3] = useState([]);



  useEffect(() => {
    if (features.details !== null) {
      let filter1List = []
      let filter2List = []
      setTableData(features.details);
      features.details.forEach(i => {
        if (filter1List.find(a => a.value === i[filter1ColumnName]) === undefined) {
          filter1List.push({value: i[filter1ColumnName], label: i[filter1ColumnName]})
        }
        if (filter2List.find(a => a.value === i[filter2ColumnName]) === undefined) {
          filter2List.push({value: i[filter2ColumnName], label: i[filter2ColumnName]})
        }
      })
      setFilter1(filter1List)
      setFilter2(filter2List)
    }
    getChartData();
  }, [features.version]);

  useEffect(() => {
    getFeatures().then(() => {
                           }
    )
  }, [])

const getChartData = () => {
  if (features.details !== null) {
    let d = []
    let d2 = []
    let d3 = []
    const dataFiltered = features.details.filter(i => i.discon === false && i.current === true)
    dataFiltered.forEach(i => {
      d.push([i.name, i.time_to_use * i.num_of_use, '#669bbc'])
      d2.push([i.name, i.time_to_use, '#b23a48'])
      d3.push([i.name, i.num_of_use, '#403d39'])
    })
    setChartData(d)
    setChartData2(d2)
    setChartData3(d3)
  }
};

  const dataFiltered = applyFilter({
                                     inputData: tableData,
                                     comparator: getComparator(table.order, table.orderBy),
                                     filters,
                                   });

  const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const dataInPage = dataFiltered.slice(
    table.page * table.rowsPerPage,
    table.page * table.rowsPerPage + table.rowsPerPage
  );

  const denseHeight = table.dense ? 60 : 80;

  const canReset = !isEqual(defaultFilters, filters);

  const notFound = (!dataFiltered.length && canReset) || featureEmpty;

  const handleFilters = useCallback(
    (name, value) => {
      table.onResetPage();
      setFilters((prevState) => ({
        ...prevState,
        [name]: value,
      }));

    },
    [table]
  );

  // Delete the item
  const handleDeleteRow = useCallback(
    (id) => {
      if(selectedProduct.details !== null) {
        if (selectedProduct.details.role === 'admin' || selectedProduct.details.role === 'owner') {
          const deleteRow = tableData.filter((row) => row.id !== id);
          setTableData(deleteRow);
          deleteFt(id).then(
          )
          table.onUpdatePageDeleteRow(dataInPage.length);
        }
      } else {
        setSnakeMessage('Select product first')
        setSnakeOpen(true)
      }

    },
    [dataInPage.length, table, tableData]
  );

  // Edit the item
  const handleEditRow = (id) => {
    if(selectedProduct.details !== null) {
      if (selectedProduct.details.role === 'admin' || selectedProduct.details.role === 'owner') {
        navigate(`/feature/current/new/${id}`);
      } else {
        setSnakeMessage('Permission Denied')
        setSnakeOpen(true)
      }
    } else {
      setSnakeMessage('Select product first')
      setSnakeOpen(true)
    }

  };

  // Add New
  const handleAddNew = () => {
    if(selectedProduct.details !== null) {
      if (selectedProduct.details.role === 'admin' || selectedProduct.details.role === 'owner') {
        navigate(paths.feature.newCurrent)
      } else {
        setSnakeMessage('Permission Denied')
        setSnakeOpen(true)
      }
    } else {
      setSnakeMessage('Select product first')
      setSnakeOpen(true)
    }

  }


  const handleViewRow = (id) => {
    handleEditRow(id)
  };

  const handleResetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  // Export
  const handleExport = () => {
    let temp = []
    tableData.forEach(i => {
      temp.push({
                  Id: i.id,
                  Name: i.name,
                  Time_To_Use:i.time_to_use,
                  Number_Of_User: i.num_of_use,
                  Kano: i.kano,
                  Discontinue: i.discon,
                  Description: i.des,
                  Current: i.current
                },)
    })
    writeFile(temp, 'All', "features.xlsx")
  };

  const handleDeleteSelected = () => {
    //when confirm message
    setOpenDeleteDialog(false);
    table.selected.forEach(i => {
      deleteFt(i).then(
      )
    })
    table.setSelected([])
  };

  const handleSelectRow = (id) => {
    //selectProduct(id)
  };


  return (
    <>
      <Container maxWidth={settings.themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Features Analysis"
          links={[{ name: 'List', href: paths.feature.root }]}
          action={
            <Button
              component={null}
              onClick={handleAddNew}
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
            >
              New
            </Button>
          }
          sx={{ mb: { xs: 3, md: 5 } }}
        />

        <Card>
          <FeaturesTableToolbar
            filters={filters}
            onFilters={handleFilters}
            //
            filter1={filter1}
            filter2={filter2}
            filter1Name={filter1Name}
            filter2Name={filter2Name}
            handleExport={handleExport}
          />

          {canReset && (
            <FeaturesTableFiltersResult
              filters={filters}
              onFilters={handleFilters}
              //
              onResetFilters={handleResetFilters}
              //
              results={dataFiltered.length}
              filter1Name={filter1Name}
              filter2Name={filter2Name}
              sx={{ p: 2.5, pt: 0 }}
            />
          )}

          <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
            <TableSelectedAction
              dense={table.dense}
              numSelected={table.selected.length}
              rowCount={tableData.length}
              onSelectAllRows={(checked) =>
                table.onSelectAllRows(
                  checked,
                  tableData.map((row) => row.id)
                )
              }
              action={
                <Tooltip title="Delete">
                  <IconButton color="primary" onClick={() => setOpenDeleteDialog(true)}>
                    <Iconify icon="solar:trash-bin-trash-bold" />
                  </IconButton>
                </Tooltip>
              }
            />

            <Scrollbar>
              <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
                <TableHeadCustom
                  order={table.order}
                  orderBy={table.orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={tableData.length}
                  numSelected={table.selected.length}
                  onSort={table.onSort}
                  onSelectAllRows={(checked) =>
                    table.onSelectAllRows(
                      checked,
                      tableData.map((row) => row.id)
                    )
                  }
                />

                <TableBody>
                  {featureLoading ? (
                    [...Array(table.rowsPerPage)].map((i, index) => (
                      <TableSkeleton key={index} sx={{ height: denseHeight }} />
                    ))
                  ) : (
                    <>
                      {dataFiltered
                        .slice(
                          table.page * table.rowsPerPage,
                          table.page * table.rowsPerPage + table.rowsPerPage
                        )
                        .map((row) => (
                          <FeaturesTableRow
                            key={row.id}
                            row={row}
                            selected={table.selected.includes(row.id)}
                            onSelectRow={() => table.onSelectRow(row.id)}
                            onDeleteRow={() => handleDeleteRow(row.id)}
                            onEditRow={() => handleEditRow(row.id)}
                            onViewRow={() => handleViewRow(row.id)}
                            handleClickSelected={() => handleSelectRow(row.id)}
                          />
                        ))}
                    </>
                  )}

                  <TableEmptyRows
                    height={denseHeight}
                    emptyRows={emptyRows(table.page, table.rowsPerPage, tableData.length)}
                  />

                  <TableNoData notFound={notFound} />
                </TableBody>
              </Table>
            </Scrollbar>
          </TableContainer>

          <TablePaginationCustom
            count={dataFiltered.length}
            page={table.page}
            rowsPerPage={table.rowsPerPage}
            onPageChange={table.onChangePage}
            onRowsPerPageChange={table.onChangeRowsPerPage}
            //
            dense={table.dense}
            onChangeDense={table.onChangeDense}
          />
        </Card>

        <Card sx={{marginTop: '20px'}}>
           <CustomChart title={"Usage"} data={chartData} bg={settings.themeMode === 'light' ? 'white' : '#B9BFB4'} densityColor={'#bbd0ff'}/>
        </Card>

        <Card sx={{marginTop: '20px'}}>
          <CustomChart title={"Time To Use"} data={chartData2} bg={settings.themeMode === 'light' ? 'white' : '#B9BFB4'} densityColor={'#f7c59f'}/>
        </Card>

        <Card sx={{marginTop: '20px'}}>
          <CustomChart title={"Number Of Users"} data={chartData3} bg={settings.themeMode === 'light' ? 'white' : '#B9BFB4'} densityColor={'#fbb900'}/>
        </Card>

      </Container>

      <Dialog
        open={openDeleteDialog}
        slots={{
          transition: Transition,
        }}
        keepMounted
        onClose={handleCloseDeleteDialog}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Delete Confirmation?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure you want to delete selected items
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
          <Button onClick={handleDeleteSelected}>Yes</Button>
        </DialogActions>
      </Dialog>

      <Box sx={{ width: 500 }}>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          autoHideDuration={1000}
          open={snakeOpen}
          message={snakeMessage}
          onClose={() => setSnakeOpen(false)}
          key={'top' + 'center'}
        />
      </Box>



    </>
  );
}

// ----------------------------------------------------------------------

function applyFilter({ inputData, comparator, filters }) {
  const { name, filter1, filter2 } = filters;

  const stabilizedThis = inputData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (name) {
    inputData = inputData.filter(
      (item) => item.name.toLowerCase().indexOf(name.toLowerCase()) !== -1
    );
  }

  if (filter1.length) {
    inputData = inputData.filter((item) => filter1.includes(item[filter1ColumnName])

    );
  }

  if (filter2.length) {
    inputData = inputData.filter((item) => filter2.includes(item[filter2ColumnName])

    );
  }

  return inputData;
}
