// @mui
import Grid from "@mui/material/Unstable_Grid2";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import CardHeader from "@mui/material/CardHeader";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
// ----------------------------------------------------------------------
import React, { useEffect, useState } from "react";
import { useModel } from "src/hooks/useModel";
import { useViewerFunction } from "src/autodesk/useViewerFunctions";
import BlockageDetails from "./BlockageDetails";
import Iconify from "src/components/iconify";
import TableFilter from "src/components/tables/TableFilter";
import Chip from "src/components/chip/Chip";
import { useBlockage } from "src/hooks/useBlockage";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Blockage() {
  const [open, setOpen] = React.useState(false);
  const [infoTitle, setInfoTitle] = useState('');
  const [infoBody, setInfoBody] = useState('')
  const [modelSelectedItem, setModelSelectedItem] = useState([]);
  const [des, setDes] = useState("");
  const [cat, setCat] = useState("");
  const [addMode, setAddMode] = useState(false);
  const [modelSate, setModelState] = useState("default");
  const [searchIn, setSearchIn] = useState("Tag");
  const [searchFilter, setSearchFilter] = useState("");
  const [filterData, setFilterData] = useState([]);
  const [defaultSearchText, setDefaultSearchText] = useState("");
  const { docId } = useModel();
  const {
    init,
    unIsolate,
    selectedItem,
    setDBIdColor,
    clearThemingColors,
    modelReady,
    colorItem,
    searchAndIsolate,
  } = useViewerFunction();
  const { blockage, error, addDone, addBlockage, getBlockages } = useBlockage();

  const setFilter = () => {
    if (searchIn !== "" || searchFilter !== "") {
      const flt = blockage.details.filter((i) => i[searchIn] === searchFilter);
      if (flt !== undefined) {
        setFilterData(flt);
      } else {
        setFilterData([]);
      }
    } else {
      setFilterData(blockage.details);
    }
  };

  const clearFilter = () => {
    setFilterData(blockage.details);
  };

  const handleSearchInChange = (e) => {
    setSearchIn(e);
  };

  const handleSearchFilterChange = (e) => {
    setSearchFilter(e);
  };

  const handleOnDeleteChip = (e) => {
    const temp = modelSelectedItem.filter((i) => i !== e);
    setModelSelectedItem(temp);
  };

  const handleRemoveAllItems = () => {
    setModelSelectedItem([]);
  };

  const handleSetAddMode = () => {
    setAddMode(!addMode);
  };

  const handleAddBlockage = () => {
    modelSelectedItem.forEach((i) => {
      addBlockage(i, des, cat);
    });
    getBlockages();
    setAddMode(false);
  };

  const handleDefaultModel = () => {
    if (modelReady) {
      unIsolate();
      setModelState("default");
      clearThemingColors();
    }
  };

  const handleWhiteModel = () => {
    if (modelReady) {
      setModelState("white");
      setDBIdColor([2], 255, 255, 255, 1);
      filterData.forEach((i) => {
        colorItem(i.Tag, 255, 0, 0, 1);
      });
    }
  };

  const handleFindItem = (e) => {
    if (modelReady) {
      unIsolate();
      searchAndIsolate(e);
      window.scrollTo({top: 0, behavior: 'smooth'})
    }
  };

  const handleChipBtnClick = (e) => {
    
    const item = blockage.details.find(i => i.Tag === e)
    if (item !== undefined) {
      setInfoTitle(e)
      setInfoBody(item.Blockage)
      setOpen(true);
    }
    
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    init("viewerDiv", docId);
  }, []);

  useEffect(() => {
    if (selectedItem !== null) {
      let det = [];
      selectedItem.properties.map((a) => {
        if (a.displayName === "Name") {
          if (
            modelSelectedItem.find((i) => i === a.displayValue) === undefined
          ) {
            if (det.find((i) => i === a.displayValue) === undefined) {
              det.push(a.displayValue);
            }
          }
        }
      });
      setModelSelectedItem(modelSelectedItem.concat(det));
    }
  }, [selectedItem]);

  useEffect(() => {
    setFilterData(blockage.details);
  }, [blockage.version]);

  useEffect(() => {
    setAddMode(!addDone);
  }, [addDone]);

  useEffect(() => {
    getBlockages();
  }, []);

  return (
    <Grid container spacing={4} sx={{ height: 100 }}>
      <Grid xs={12} md={12} lg={12} sx={{ height: "80vh" }}>
        <div
          style={{ position: "relative", width: "100%", height: "100%" }}
          id="viewerDiv"
        />
      </Grid>

      <Grid xs={12} md={12} lg={12}>
        <Stack
          direction="row"
          spacing={2}
          sx={{
            justifyContent: "flex-start",
            alignItems: "flex-start",
          }}
        >
          <Button
            onClick={handleRemoveAllItems}
            color="secondary"
            variant="contained"
            endIcon={<Iconify icon="line-md:filter-remove" sx={{ ml: -0.5 }} />}
          >
            Clear
          </Button>
          {modelSelectedItem.map((i, index) => {
            return (
              <Chip
                key={index}
                tag={i}
                text={i}
                variant="outlined"
                onCloseClick={handleOnDeleteChip}
                onButtonClick={handleChipBtnClick}
              />
            );
          })}
        </Stack>
      </Grid>

      {!addMode && (
        <Grid xs={12} md={12} lg={12}>
          <Box sx={{ p: 2, textAlign: "right" }}>
            <Button
              color="error"
              onClick={handleDefaultModel}
              variant={modelSate === "default" ? "contained" : "outlined"}
              sx={{ mr: 1 }}
            >
              Default Model
            </Button>
            <Button
              color="error"
              onClick={handleWhiteModel}
              variant={modelSate !== "default" ? "contained" : "outlined"}
              sx={{ mr: 1 }}
            >
              Show Blockages in Model
            </Button>
            <Button
              onClick={() => {
                getBlockages();
              }}
              variant="contained"
              sx={{ mr: 1 }}
              endIcon={
                <Iconify
                  icon="material-symbols:refresh"
                  width={25}
                  sx={{ mr: -0.5 }}
                />
              }
            >
              Refresh
            </Button>

            <Button
              onClick={handleSetAddMode}
              color="warning"
              variant="contained"
              endIcon={
                <Iconify
                  icon="line-md:document-add-twotone"
                  width={18}
                  sx={{ ml: -0.5 }}
                />
              }
            >
              Add Blockage
            </Button>
          </Box>
        </Grid>
      )}
      {addMode && (
        <Grid
          xs={12}
          md={12}
          lg={12}
          sx={{
            alignSelf: "center",
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
          }}
        >
          <Card sx={{ width: "70vw" }}>
            <CardHeader title="New Blockage" sx={{ mb: 2 }} />
            <Grid>
              <TextField
                onChange={(e) => {
                  setDes(e.target.value);
                }}
                id="standard-helperText"
                label="Blockage"
                defaultValue=""
                helperText="Add discription for the blockage"
                variant="standard"
                sx={{ width: "100%" }}
              />
            </Grid>
            <Grid>
              <TextField
                onChange={(e) => {
                  setCat(e.target.value);
                }}
                id="standard-helperText"
                label="Category"
                defaultValue=""
                helperText="Blockage's category"
                variant="standard"
                sx={{ width: "100%" }}
              />
            </Grid>
            <Grid>
              <Stack
                direction="row"
                spacing={2}
                sx={{
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="overline"
                  color="error"
                  gutterBottom
                  sx={{ marginTop: 1 }}
                >
                  {error}
                </Typography>

                <Button
                  onClick={handleAddBlockage}
                  variant="contained"
                  endIcon={
                    <Iconify
                      icon="material-symbols:save"
                      width={25}
                      sx={{ ml: -0.5 }}
                    />
                  }
                >
                  Save
                </Button>

                <Button
                  onClick={handleSetAddMode}
                  variant="contained"
                  color="warning"
                  endIcon={
                    <Iconify
                      icon="material-symbols:close"
                      width={25}
                      sx={{ ml: -0.5 }}
                    />
                  }
                >
                  Cancel
                </Button>
              </Stack>
            </Grid>
          </Card>
        </Grid>
      )}

      <Grid xs={12} md={12} lg={12}>
        <Card>
          <CardHeader title="Blockages Details" sx={{ mb: 2 }} />
          <TableFilter
            menuItems={[
              "Tag",
              "GroupName",
              "Discipline",
              "Type",
              "Blockage",
              "Category",
            ]}
            defaultValue={searchIn}
            handleChange={handleSearchInChange}
            handleTextChange={handleSearchFilterChange}
            handleSearchClick={setFilter}
            handleClearClick={clearFilter}
            resultCount={filterData.length}
            defaultSearchText={defaultSearchText}
          />
          <BlockageDetails
            title="Details"
            tableData={filterData}
            handleFind={(e) => handleFindItem(e)}
          />
        </Card>
      </Grid>

      <React.Fragment>
        <Dialog
          open={open}
          slots={{
            transition: Transition,
          }}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{infoTitle}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description" color="error">
              {infoBody}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    </Grid>
  );
}
