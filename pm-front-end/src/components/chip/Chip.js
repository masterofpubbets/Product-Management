import Button from "@mui/material/Button";
import Iconify from "src/components/iconify";
import Stack from "@mui/material/Stack";


export default function Chip({
  variant,
  text,
  tag,
  onCloseClick,
  onButtonClick,
}) {

  const handleOnClick = (e) => {
    if (e.target.innerHTML === "") {
      onCloseClick(tag);
    }
  };

  const handleOnBtnClick = (e) => {
    if (e.target.innerHTML !== "") {
      onButtonClick(tag);
    }
  };

  return (
    <>
      <Stack
        direction="row"
        spacing={2}
        sx={{
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <Button
          variant={variant === undefined ? "text" : "contained"}
          onClick={handleOnBtnClick}
          endIcon={
            <Iconify
              onClick={handleOnClick}
              icon="line-md:close-circle-filled"
              width={25}
              sx={{ ml: -0.5 }}
            />
          }
        >
          {text}
        </Button>
      </Stack>
    </>
  );
}
