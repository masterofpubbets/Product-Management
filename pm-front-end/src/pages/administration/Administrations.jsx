import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import { useSettingsContext } from "src/components/settings";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";


export default function Administration() {
  const settings = useSettingsContext();
  const navigate = useNavigate();

  const handleUsers = () => {
    navigate("/dashboard/users/list");
  };

  return (
    <Container maxWidth={settings.themeStretch ? false : "xl"}>
      <Grid container spacing={3}>
        <Grid xs={12} md={12} lg={12}>
          <Typography variant="h4" gutterBottom>
            Administration
          </Typography>
        </Grid>
        <Grid xs={12} lg={12} md={12}>
          <Stack direction="row" spacing={2}>
            <Button color="primary" variant="contained" onClick={handleUsers}>
              Users
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}
