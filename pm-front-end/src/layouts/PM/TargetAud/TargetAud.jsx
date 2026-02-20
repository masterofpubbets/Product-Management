import { useState, useEffect, useCallback, forwardRef } from "react";
import { useNavigate  } from 'react-router-dom';
import isEqual from 'lodash/isEqual';
// @mui
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
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

} from "src/components/table";
import Iconify from "src/components/iconify";
import CustomBreadcrumbs from "src/components/custom-breadcrumbs";
//
import TATableToolbar from "./ta-table-toolbar";
import TATableFiltersResult from "./ta-table-filter-result";
import UserCardList from "src/layouts/PM/TargetAud/UserCardList";
// Hooks
import { useXlsx } from "src/hooks/useXlsx";
import {useProduct} from "src/hooks/useProducts";
import {useTargetAud} from "src/hooks/useTargetAud";
// ----------------------------------------------------------------------


const defaultFilters = {
  name: "",
  filter1: [],
  filter2: []
};

const filter1Name = "Gender"
const filter2Name = "Age"

const filter1ColumnName = "gender"
const filter2ColumnName = "age"

export default function TargetAud() {
  const navigate = useNavigate();
  const table = useTable();
  const settings = useSettingsContext();
  const [tableData, setTableData] = useState([]);
  const [filters, setFilters] = useState(defaultFilters);
  const {targetAud, getTargetAud, targetAudEmpty, targetAudLoading, delTargetAud} = useTargetAud();
  const {selectedProduct} = useProduct();
  const [filter1, setFilter1] = useState([{value: '', label: ''}])
  const [filter2, setFilter2] = useState([{value: '', label: ''}])
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const {writeFile} = useXlsx();
  const [snakeOpen, setSnakeOpen] = useState(false);
  const [snakeMessage, setSnakeMessage] = useState('')




  useEffect(() => {
    if (targetAud.details !== null) {
      let filter1List = []
      let filter2List = []
      setTableData(targetAud.details);
      targetAud.details.forEach(i => {
        if (filter1List.find(a => a.value === i.gender) === undefined) {
          filter1List.push({value: i.gender, label: i.gender})
        }
        if (filter2List.find(a => a.value === i.age) === undefined) {
          filter2List.push({value: i.age, label: i.age})
        }
      })
      setFilter1(filter1List)
      setFilter2(filter2List)
    }
  }, [targetAud.version]);

  useEffect(() => {
    getTargetAud().then(() => {
                   }
    )
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

  const canReset = !isEqual(defaultFilters, filters);

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
          delTargetAud(id).then(
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
        navigate(`/targetaud/new/${id}`);
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
        navigate(paths.targetAud.new)
      } else {
        setSnakeMessage('Permission Denied')
        setSnakeOpen(true)
      }
    } else {
      setSnakeMessage('Select product first')
      setSnakeOpen(true)
    }

  }


  const handleResetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  // Export
  const handleExport = () => {
    let temp = []
    tableData.forEach(i => {
      temp.push({
                  Id: i.id,
                  Role: i.role,
                  Age:i.age,
                  Gender:i.gender,
                  Education: i.education,
                  Location: i.location,
                  Problem: i.problem,
                  Interests: i.interests,
                  Behavioral: i.bahavioral,
                  LifeStyle: i.life_style,
                  Goal: i.goal,
                },)
    })
    writeFile(temp, 'All', "UserPersona.xlsx")
  };

  const handleDeleteSelected = () => {
    //when confirm message
    setOpenDeleteDialog(false);
    table.selected.forEach(i => {
      delTargetAud(i).then(
      )
    })
    table.setSelected([])
  };


  return (
    <>
      <Container maxWidth={settings.themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Target Audience"
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

        <Card sx={{marginBottom: '25px'}}>
          <TATableToolbar
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
            <TATableFiltersResult
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
        </Card>

        <UserCardList users={dataFiltered} onDelete={handleDeleteRow} onEdit={handleEditRow}/>

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
      (item) => item.role.toLowerCase().indexOf(name.toLowerCase()) !== -1
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
