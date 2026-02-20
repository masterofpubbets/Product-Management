import {useNavigate} from "react-router-dom";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

export default function PageTitle({title}) {
  const navigate = useNavigate();

  const handleBack = (e) => {
    e.preventDefault()
    navigate(-1)
  }

  return(
    <Stack direction="row" spacing={2}>
      <IconButton aria-label="delete" onClick={handleBack}>
        <KeyboardBackspaceIcon />
      </IconButton>

      <Box sx={{ width: '100%', maxWidth: 500, marginTop: '5px' }}>
        <Typography variant="h4" gutterBottom>
          {title}
        </Typography>
      </Box>
    </Stack>
  )
};
