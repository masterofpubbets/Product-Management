import { useState, useEffect, useCallback, forwardRef } from "react";
import { useNavigate, useParams  } from 'react-router-dom';
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
import ProductTableRow from "./product-table-row";
import ProductTableToolbar from "./product-table-toolbar";
import ProductTableFiltersResult from "./product-table-filters-result";
// Hooks
import { useProduct } from "src/hooks/useProducts";
import { useXlsx } from "src/hooks/useXlsx";
import Box from "@mui/material/Box";
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "logo", label: "Product" },
  { id: "type", label: "Type", width: 240 },
  { id: "role", label: "Role", width: 160 },
  { id: "isefault", label: "Default", width: 100 },
  { id: "", width: 88 },
];

const defaultFilters = {
  name: "",
  filter1: [],
  filter2: []
};

const filter1Name = "Type"
const filter2Name = "Role"

const filter1ColumnName = "type"
const filter2ColumnName = "role"

export default function ProductMenu() {
  const navigate = useNavigate();
  const table = useTable();
  const settings = useSettingsContext();
  const [tableData, setTableData] = useState([]);
  const [filters, setFilters] = useState(defaultFilters);
  const { products, productsLoading, productsEmpty, getProduct, unloadProduct, deleteProduct, selectProduct } = useProduct();
  const [filter1, setFilter1] = useState([{value: '', label: ''}])
  const [filter2, setFilter2] = useState([{value: '', label: ''}])
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const {writeFile} = useXlsx();
  const [snakeOpen, setSnakeOpen] = useState(false);
  const [snakeMessage, setSnakeMessage] = useState('')

  useEffect(() => {
    if (products.details.length) {
      let roles = []
      let types = []
      setTableData(products.details);
      products.details.forEach(i => {
        if (roles.find(a => a.value === i.type) === undefined) {
          roles.push({value: i.type, label: i.type})
        }
        if (types.find(a => a.value === i.role) === undefined) {
          types.push({value: i.role, label: i.role})
        }
      })
      setFilter1(roles)
      setFilter2(types)
    }
  }, [products.version]);


  useEffect(() => {
    getProduct().then();
  }, [])

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

  const notFound = (!dataFiltered.length && canReset) || productsEmpty;

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

  const handleDeleteRow = useCallback(
    (id) => {
      const deleteRow = tableData.filter((row) => row.id !== id);
      setTableData(deleteRow);
      deleteProduct(id).then(
      )
      table.onUpdatePageDeleteRow(dataInPage.length);
    },
    [dataInPage.length, table, tableData]
  );

  // Edit the item
  const handleEditRow = (id) => {
    const p =  (products.details.find(p =>p.id === id))
    if (p.role === 'admin' || p.role === 'owner') {
      navigate(`/product/${id}`);
    } else {
      setSnakeMessage('Permission Denied')
      setSnakeOpen(true)
    }
  };


  const handleViewRow = (id) => {
    selectProduct(id)
  };

  const handleResetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  const handleExport = () => {
    let temp = []
    tableData.forEach(i => {
      temp.push({
        Id: i.id,
        Name: i.name,
        Type:i.type,
        Role: i.role,
        Description: i.des
        },)
    })
    writeFile(temp, 'All', "Products.xlsx")
  };

  const handleDeleteSelected = () => {
    //when confirm message
    setOpenDeleteDialog(false);
    table.selected.forEach(i => {
      deleteProduct(i).then(
      )
    })
    table.setSelected([])
  };

  const handleSelectRow = (id) => {
    selectProduct(id)
  };


  return (
    <>
      <Container maxWidth={settings.themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Products"
          links={[{ name: 'List', href: paths.product.root }]}
          action={
            <Button
              component={null}
              onClick={() => navigate(paths.dashboard.product.new)}
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
            >
              New
            </Button>
          }
          sx={{ mb: { xs: 3, md: 5 } }}
        />

        <Card>
          <ProductTableToolbar
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
            <ProductTableFiltersResult
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
                  {productsLoading ? (
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
                          <ProductTableRow
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
          open={snakeOpen}
          message={snakeMessage}
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
    inputData = inputData.filter((item) =>
    filter1.includes(item[filter1ColumnName])
    );
  }

  if (filter2.length) {
    inputData = inputData.filter((item) =>
      filter2.includes(item[filter2ColumnName])
    );
  }

  return inputData;
}
