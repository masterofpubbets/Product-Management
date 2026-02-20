import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUsers } from "src/hooks/useUsers";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import { useSettingsContext } from "src/components/settings";
import UsersTable from "src/sections/overview/app/app-users";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";

export default function Users() {
  const settings = useSettingsContext();
  const navigate = useNavigate();
  const { users, usersVersion, getUsers } = useUsers();
  const [updatedUsers, setUpdatedUsers] = useState(users)

  const handleRefresh = () => {
    setUpdatedUsers([])
    getUsers();
  };

  const handleNew = () => {
    navigate("/dashboard/users/new");
  };

  const handleAdmin = () => {
    navigate("/dashboard/administration");
  };

  useEffect(() => {
    setUpdatedUsers(users)
  }, [usersVersion])

  return (
    <Container maxWidth={settings.themeStretch ? false : "xl"}>
      <Grid container spacing={3}>
        {updatedUsers.length === 0 && (
          <Grid xs={12} lg={12} md={12}>
            <Box sx={{ width: "100%" }}>
              <LinearProgress />
            </Box>
          </Grid>
        )}

        {updatedUsers.length > 0 && (
          <Grid xs={12} lg={12} md={12}>
            <UsersTable
              title="Users"
              tableData={updatedUsers}
              tableLabels={[
                { id: "UserId", label: "Id" },
                { id: "UserFullName", label: "Full Name" },
                { id: "UserMail", label: "Mail" },
                { id: "UserGroup", label: "Group" },
                { id: "Company", label: "Company" },
                { id: "Department", label: "Department" },
                { id: "Country", label: "Country" },
                { id: "Project", label: "Project" },
                { id: "Role", label: "Role" },
                { id: "" },
              ]}
              showButton={false}
            />
          </Grid>
        )}

        <Grid xs={12} lg={12} md={12}>
          <Stack direction="row" spacing={2}>
            <Button color="secondary" variant="contained" onClick={handleAdmin}>
              Administration
            </Button>
            <Button color="primary" variant="contained" onClick={handleRefresh}>
              Refresh
            </Button>
            <Button color="primary" variant="contained" onClick={handleNew}>
              New
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}
