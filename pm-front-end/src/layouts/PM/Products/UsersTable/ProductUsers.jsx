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
import UsersTableRow from "../UsersTable/users-table-row";
import UsersTableToolbar from "../UsersTable/users-table-toolbar";
import UsersTableFiltersResult from "../UsersTable/users-table-filters-result";
// Hooks
import { useProduct } from "src/hooks/useProducts";
import { useUsers } from "src/hooks/useUsers";
import { useXlsx } from "src/hooks/useXlsx";
import ChangeUserRole from "src/layouts/PM/Products/UsersTable/ChangeUserRole";
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "logo", label: "User" },
  { id: "role", label: "Role", width: 160 },
  { id: "", width: 88 },
];

const defaultFilters = {
  name: "",
  filter1: [],
  filter2: []
};

const filter1Name = "Mail"
const filter2Name = "First Name"

const filter1ColumnName = "mail"
const filter2ColumnName = "fname"

export default function ProductUsers({proId}) {
  const table = useTable();
  const settings = useSettingsContext();
  const [tableData, setTableData] = useState([]);
  const [filters, setFilters] = useState(defaultFilters);
  const {user} = useUsers();
  const { users, changeUserRole, productsEmpty, removeUser, userLoading } = useProduct(user.uuid, user.details.id);
  const [filter1, setFilter1] = useState([{value: '', label: ''}])
  const [filter2, setFilter2] = useState([{value: '', label: ''}])
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const {writeFile} = useXlsx();
  const [showChangeUserRole, setShowChangeUserRole] = useState(false);
  const [pu_id, setPu_id] = useState(null);

  useEffect(() => {
    let mails = []
    let lastNames = []
    if (users.details.length) {
      setTableData(users.details);
      users.details.forEach(i => {
        if (mails.find(a => a.value === i.mail) === undefined) {
          mails.push({value: i.mail, label: i.mail})
        }
        if (lastNames.find(a => a.value === i.fname) === undefined) {
          lastNames.push({value: i.fname, label: i.fname})
        }
      })
    } else {
      setTableData([])
    }
    setFilter1(mails)
    setFilter2(lastNames)
  }, [users.version]);

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


  // Delete row from table
  const handleDeleteRow = useCallback(
    (id) => {
      const deleteRow = tableData.filter((row) => row.id !== id);
      setTableData(deleteRow);
      removeUser(id, proId).then(
      )
      table.onUpdatePageDeleteRow(dataInPage.length);
    },
    [dataInPage.length, table, tableData]
  );



  // Edit the item
  const handleEditRow = (id) => {
    setPu_id(id);
    setShowChangeUserRole(true)
  };

  const handleChangeUserRole = (data) => {
    setShowChangeUserRole(false)
    changeUserRole(pu_id, data, proId).then(

    )

  };


  const handleViewRow = (id) => {
    handleEditRow(id)
  };

  const handleResetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  const handleExport = () => {
    let temp = []
    tableData.forEach(i => {
      temp.push({
                  Id: i.id,
                  FirstName: i.fname,
                  LastName:i.lname,
                  Role: i.role,
                  mail: i.mail
                },)
    })
    writeFile(temp, 'All', "ProductsUsers.xlsx")
  };

  // Delete all selected
  const handleDeleteSelected = () => {
    //when confirm message
    setOpenDeleteDialog(false);
    table.selected.forEach(i => {
      removeUser(i, proId).then(
      )
    })
    table.setSelected([])
  };


  return (
    <>
      <Container maxWidth={settings.themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Users Assigned"
          links={[{ name: 'List', href: paths.product.root }]}
          sx={{ mb: { xs: 3, md: 5 } }}
        />

        <Card>
          <UsersTableToolbar
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
            <UsersTableFiltersResult
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
                  {userLoading ? (
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
                          <UsersTableRow
                            key={row.id}
                            row={row}
                            selected={table.selected.includes(row.id)}
                            onSelectRow={() => table.onSelectRow(row.id)}
                            onDeleteRow={() => handleDeleteRow(row.id)}
                            onEditRow={() => handleEditRow(row.id)}
                            onViewRow={() => handleViewRow(row.id)}
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

      <ChangeUserRole show={showChangeUserRole} handleSubmit={handleChangeUserRole} />

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
      (item) => item.fname.toLowerCase().indexOf(name.toLowerCase()) !== -1
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
