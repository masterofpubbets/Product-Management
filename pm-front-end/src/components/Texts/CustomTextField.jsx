// @mui
import TextField from '@mui/material/TextField';
import {useState, useEffect} from "react";

// ----------------------------------------------------------------------

export default function CustomTextField({ value, helperText, error, type, onChange, ...other }) {
  const [textValue, setTextValue] = useState(value);

  const handleOnchange = (e) => {
    if (type === 'number') {
      setTextValue(Number(e.target.value));
      onChange(e.target.value)
    } else {
      setTextValue(e.target.value);
      onChange(e.target.value)
    }
  };

  useEffect(() => {
    setTextValue(value)
  }, [value]);

  return (
        <TextField
          fullWidth
          type={type}
          value={type === 'number' && textValue === '' ? 0 : textValue}
          onChange={handleOnchange}
          error={!!error}
          helperText={error ? helperText : ''}
          {...other}
        />
  );
}

