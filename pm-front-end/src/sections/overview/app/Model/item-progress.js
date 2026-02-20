import PropTypes from "prop-types";
// @mui
import Stack from "@mui/material/Stack";
import CardHeader from "@mui/material/CardHeader";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { lime, purple } from '@mui/material/colors';
// ----------------------------------------------------------------------
import { useEffect, useState } from "react";


const theme = createTheme({
  palette: {
    primary: lime,
    secondary: purple,
  },
});

export default function ItemProgress({ title, subheader, doneDate, progress }) {
  const [textColor, setTextColor] = useState("error");

  useEffect(() => {
    if (progress === 0) {
      setTextColor("error")
    }
    if (progress > 0 && progress < 100) {
      setTextColor("warning")
    }
    if (progress === 100) {
      setTextColor("primary")
    }
  }, [])

  return (
    <Card>
      <CardHeader title={title} subheader={subheader} sx={{ mb: 1 }} />
      <Grid xs={12} lg={12} md={12}>
        <Stack
          spacing={1}
          direction="column"
          sx={{
            justifyContent: "center",
            alignItems: "flex-start",
            marginLeft: 5
          }}
        >
          <Typography variant="subtitle2">{`Done Date: ${doneDate}`}</Typography>
          <Typography variant="subtitle2" color={textColor}>{`Progress: ${progress}`}</Typography>
        </Stack>
      </Grid>
    </Card>
  );
}

ItemProgress.propTypes = {
  chart: PropTypes.object,
  subheader: PropTypes.string,
  title: PropTypes.string,
};
