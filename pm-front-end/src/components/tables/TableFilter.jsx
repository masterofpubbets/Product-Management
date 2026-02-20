import Grid from "@mui/material/Unstable_Grid2";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";

export default function TableFilter({
  menuItems,
  defaultValue,
  label,
  handleChange,
  defaultSearchText,
  handleTextChange,
  handleSearchClick,
  handleClearClick,
  resultCount,
  addNone,
}) {
  const [selected, setSelected] = useState(
    defaultValue === undefined ? "" : defaultValue
  );

  const [searchText, setSearchText] = useState(defaultSearchText === undefined ? '' : defaultSearchText);

  const handleOnChange = (e) => {
    setSelected(e.target.value);
    handleChange(e.target.value);
  };

  const handleOnTextChange = (e) => {
    setSearchText(e.target.value);
    handleTextChange(e.target.value);
  };

  const handleBtnClear = () => {
    setSearchText('');
    handleClearClick();
  };

  useEffect(() => {
    setSearchText(defaultSearchText);
  }, [defaultSearchText]);

   useEffect(() => {
    setSelected(defaultValue);
  }, [defaultValue]);

  return (
    <Grid xs={12} lg={12} md={12} sx={{ marginBottom: 1 }}>
      <Stack
        direction="row"
        spacing={2}
        sx={{
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={selected}
          label={label}
          onChange={handleOnChange}
        >
          {addNone && (
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
          )}

          {menuItems.map((i, index) => {
            return (
              <MenuItem key={index} value={i}>
                {i}
              </MenuItem>
            );
          })}
        </Select>

        <TextField
          id="outlined-basic"
          label="Search"
          variant="outlined"
          sx={{ width: "40vw" }}
          value={searchText}
          onChange={handleOnTextChange}
        />

        <Button onClick={handleSearchClick} variant="contained" color="primary">
          Search
        </Button>
        <Button
          onClick={handleBtnClear}
          variant="contained"
          color="secondary"
        >
          Clear
        </Button>
      </Stack>

      <Stack
        direction="row"
        spacing={2}
        sx={{
          justifyContent: "flex-start",
          alignItems: "center",
          marginTop: 2,
        }}
      >
        <Typography variant="caption" gutterBottom sx={{ display: "block" }}>
          {`Result Count: ${resultCount === undefined ? 0 : resultCount}`}
        </Typography>
      </Stack>
    </Grid>
  );
}
