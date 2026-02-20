import { useNavigate } from "react-router-dom";
import { m } from "framer-motion";
// @mui
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
// routes
import { paths } from "src/routes/paths";
import { useRouter } from "src/routes/hooks";
// auth
import { useAuthContext } from "src/auth/hooks";
// components
import { varHover } from "src/components/animate";
import { useSnackbar } from "src/components/snackbar";
import CustomPopover, { usePopover } from "src/components/custom-popover";
import userMale from "src/assets/illustrations/user-male.png";
import {useProduct} from "src/hooks/useProducts";

// ----------------------------------------------------------------------

const OPTIONS = [
  {
    label: "Profile",
    linkTo: paths.dashboard.user.profile,
  },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const router = useRouter();
  const navigate = useNavigate();
  const { logout, user } = useAuthContext();
  const { enqueueSnackbar } = useSnackbar();
  const popover = usePopover();
  const {reset} = useProduct();

  const handleLogout = async () => {
    try {
      await reset();
      await logout();
      popover.onClose();
      router.replace("/");
    } catch (error) {
      console.error(error);
      enqueueSnackbar("Unable to logout!", { variant: "error" });
    }
  };

  const handleClickItem = (path) => {
    popover.onClose();
    router.push(path);
  };

  const handleClickProduct = (path) => {
    popover.onClose();
    navigate(paths.product.root);
  };

  const handleAdministration = () => {
    popover.onClose();
    navigate("/dashboard/administration");
  };

  return (
    <>
      <IconButton
        component={m.button}
        whileTap="tap"
        whileHover="hover"
        variants={varHover(1.05)}
        onClick={popover.onOpen}
        sx={{
          width: 40,
          height: 40,
          background: (theme) => alpha(theme.palette.grey[500], 0.08),
          ...(popover.open && {
            background: (theme) =>
              `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
          }),
        }}
      >
        <Avatar
          src={user.details.logo !== "" ? user.details.logo : userMale}
          alt={user?.details.fname}
          sx={{
            width: 36,
            height: 36,
            border: (theme) => `solid 2px ${theme.palette.background.default}`,
          }}
        />
      </IconButton>

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        sx={{ width: 200, p: 0 }}
      >
        <Box sx={{ p: 2, pb: 1.5 }}>
          <Typography variant="subtitle2" noWrap>
            {user?.details.fname}
          </Typography>

          <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
            {user?.details.mail}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: "dashed" }} />

        <Stack sx={{ p: 1 }}>
          {OPTIONS.map((option) => (
            <MenuItem
              key={option.label}
              onClick={() => handleClickItem(option.linkTo)}
            >
              {option.label}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: "dashed" }} />
        <Stack sx={{ p: 1 }}>
          <MenuItem onClick={handleClickProduct}>{"Products"}</MenuItem>
        </Stack>

        {user.details.user_group.includes("admin") && (
          <Divider sx={{ borderStyle: "dashed" }} />
        )}

        {user.details.user_group.includes("admin") && (
          <MenuItem
            onClick={handleAdministration}
            sx={{ m: 1, fontWeight: "fontWeightBold", color: "text.secondary" }}
          >
            Administration
          </MenuItem>
        )}

        <Divider sx={{ borderStyle: "dashed" }} />

        <MenuItem
          onClick={handleLogout}
          sx={{ m: 1, fontWeight: "fontWeightBold", color: "error.main" }}
        >
          Logout
        </MenuItem>
      </CustomPopover>
    </>
  );
}
