import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Stack from "@mui/material/Stack";

export default function BreadHeader({ spacing, variant, headers }) {
  const getBreadcrumbs = () => {
    let list = [];
    headers.forEach((h, index) => {
      list.push(
        <Typography key={index} variant={variant} gutterBottom sx={{marginBottom: '0px'}}>
          {" "}
          {h.name}
        </Typography>
      );
    });
    return list;
  };

  return (
    <Stack spacing={spacing}>
      <Breadcrumbs
        separator={
          <NavigateNextIcon
            fontSize="small"
            sx={{
              marginTop: "0px",
              justifyContent: "center",
              alignItems: "center",
            }}
          />
        }
        aria-label="breadcrumb"
      >
        {getBreadcrumbs()}
      </Breadcrumbs>
    </Stack>
  );
}
