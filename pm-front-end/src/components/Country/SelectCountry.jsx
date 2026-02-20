import { useState } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Iconify from "src/components/iconify";
import { countries } from "src/assets/data";
import Stack from "@mui/material/Stack";

export default function SelectCountry({ handleChange, iniCountry, required }) {
  const [selectedCountry, setSelectedCountry] = useState(iniCountry !== undefined ? iniCountry : '');
  const [error, setError] = useState(false);
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const handleOnChange = (e) => {
    if (required) {
      if (e.target.value === '') {
        setError(true)
      } else {
        setError(false)
      }
    }
    setSelectedCountry(e.target.value);
    handleChange(e.target.value);
  };

  const getCountries = () => {
    return (
      <Select
        labelId="demo-multiple-name-label"
        id="demo-multiple-name"
        value={selectedCountry}
        onChange={handleOnChange}
        MenuProps={MenuProps}
        sx={{ width: "100%" }}
      >
        {countries
          .sort((a, b) => a.label.toLowerCase().localeCompare(b.label.toLowerCase()))
          .map((c) => (
            <MenuItem key={c.code} value={c.label}>
              <Stack direction="row" spacing={2}>
                <Iconify
                  key={c.label}
                  icon={`circle-flags:${c.code.toLowerCase()}`}
                  width={24}
                  sx={{ mr: 1 }}
                />
                <Typography>{`+${c.phone} ${c.label}`}</Typography>
              </Stack>
            </MenuItem>
          ))}
      </Select>
    );
  };

  return (
    <>
      <FormControl sx={{ minWidth: 180 }}>
        <InputLabel id="demo-simple-select-helper-label">Country</InputLabel>
        {getCountries()}
        {error && <FormHelperText sx={{color: 'red'}}>Country is Required</FormHelperText>}
      </FormControl>
    </>
  );
}
