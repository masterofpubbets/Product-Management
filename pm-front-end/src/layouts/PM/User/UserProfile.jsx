import { useState, useEffect } from "react";
// @mui
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Unstable_Grid2";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import BuildIcon from "@mui/icons-material/Build";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CreateIcon from "@mui/icons-material/Create";
import Typography from "@mui/material/Typography";
import Snackbar from "@mui/material/Snackbar";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
// _mock
import { _socials, _subconPerformance } from "src/_mock";
// components
import Iconify from "src/components/iconify";
import BreadHeader from "src/components/BreadHeader/BreadHeader";
// ----------------------------------------------------------------------
import { useUsers } from "src/hooks/useUsers";
import EditProfileAbout from "./EditProfileAbout";
import EditProfileSocial from "./EditProfileSocial";
import AddUserSkills from "./AddUserSkills";
import { useImage } from "src/hooks/useImage";

// Create a styled input component to visually hide the default file input
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function UserProfile() {
  const {
    isLoading,
    error,
    user,
    addAbout,
    addSocials,
    addBasicInfo,
    addLogo,
    deleteLogo,
    addSkills,
    setPassword
  } = useUsers();
  const [mail, setMail] = useState(user.details.mail);
  const [fname, setFname] = useState(user.details.fname);
  const [lname, setLname] = useState(user.details.lname);
  const [role, setRole] = useState(user.details.role);
  const [userGroup, setUserGroup] = useState(user.details.user_group);
  const [pass, setPass] = useState("");
  const [pass2, setPass2] = useState("");
  const [infoMsg, setInfoMsg] = useState("");
  const [showAboutEdit, setShowAboutEdit] = useState(false);
  const [showSocialEdit, setShowSocialEdit] = useState(false);
  const [showAddSkill, setShowAddSkill] = useState(false);
  const [opensnakebar, setOpenSnakebar] = useState(false);
  const [snakeMessgae, setSnakeMessage] = useState("");
  const {
    convertImageToBinary,
    imgError,
    convertBinary64ToImage,
    binaryData64,
  } = useImage();

  const [profileImg, setProfileImg] = useState(null);

  const info = {
    about:
      user.details.about !== null
        ? user.details.about.about === undefined
          ? ""
          : user.details.about.about
        : "",
    country:
      user.details.about !== null
        ? user.details.about.country === undefined
          ? ""
          : user.details.about.country
        : "",
    email: user.details.mail,
    company:
      user.details.about !== null
        ? user.details.about.company === undefined
          ? ""
          : user.details.about.company
        : "",
    school:
      user.details.about !== null
        ? user.details.about.school === undefined
          ? ""
          : user.details.about.school
        : "",
    socialLinks: {
      facebook:
        user.details.socials !== null
          ? user.details.socials.facebook === undefined
            ? ""
            : user.details.socials.facebook
          : "",
      instagram:
        user.details.socials !== null
          ? user.details.socials.instagram === undefined
            ? ""
            : user.details.socials.instagram
          : "",
      linkedin:
        user.details.socials !== null
          ? user.details.socials.linkedin === undefined
            ? ""
            : user.details.socials.linkedin
          : "",
      x:
        user.details.socials !== null
          ? user.details.socials.x === undefined
            ? ""
            : user.details.socials.x
          : "",
    },
    skills: {
      list: user.details.skills === null ? [] : user.details.skills.list,
    },
    userGroup:
      user.details.user_group === undefined ? "" : user.details.user_group,
  };

  const handleResetPass = () => {
    const result = setPassword(user.uuid, user.details.id, pass, pass2)
    if (result) {
      setSnakeMessage("Password has been reset.");
      setOpenSnakebar(true);
    }
  };

  const handleRemoveSkill = (e) => {
    let sk = info.skills.list.filter(i => i.name !== e)
    addSkills(user.uuid, user.details.id, { list: sk });
  }

  const handleAddSkill = (data) => {
    setShowAddSkill(false);
    if (data !== undefined) {
      if (data.skill !== "") {
        if (info.skills.list.find((a) => a.name === data.skill) === undefined) {
          let sk = info.skills.list;
          sk.push({ name: data.skill });
          addSkills(user.uuid, user.details.id, { list: sk });
        }
      }
    }
  };

  const handleRemoveLogo = () => {
    deleteLogo(user.uuid, user.details.id);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      convertImageToBinary(file);
    }
  };

  useEffect(() => {
    //save to db
    if (binaryData64 !== "") {
      const dataBinary = convertBinary64ToImage(binaryData64);
      addLogo(user.uuid, user.details.id, dataBinary);
    }
  }, [binaryData64]);

  const handleSaveBasicInfo = () => {
    if (
      addBasicInfo(user.uuid, user.details.id, {
        mail,
        fname,
        lname,
        role,
      })
    ) {
      setSnakeMessage("Basic data updated.");
      setOpenSnakebar(true);
    } else {
      // when something wrong
    }
  };

  const handleEditAbout = (data) => {
    setShowAboutEdit(false);
    if (data !== undefined) {
      addAbout(user.uuid, user.details.id, data);
    }
  };
  const handleEditSocial = (data) => {
    setShowSocialEdit(false);
    if (data !== undefined) {
      addSocials(user.uuid, user.details.id, data);
    }
  };

  const renderAbout = (
    <Card>
      <Stack
        direction="row"
        spacing={2}
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <CardHeader title="About" />
        <IconButton aria-label="Edit" onClick={() => setShowAboutEdit(true)}>
          <CreateIcon />
        </IconButton>
      </Stack>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Box sx={{ typography: "body2" }}>{info.about}</Box>

        <Stack direction="row" spacing={2}>
          <Iconify icon="mingcute:location-fill" width={24} />

          <Box sx={{ typography: "body2" }}>
            {`Live at `}
            <Link variant="subtitle2" color="inherit">
              {info.country}
            </Link>
          </Box>
        </Stack>

        <Stack direction="row" sx={{ typography: "body2" }}>
          <Iconify
            icon="fluent:mail-24-filled"
            width={24}
            sx={{ mr: 2 }}
            color="error"
          />
          <Link variant="subtitle2" color="error">
            {mail}
          </Link>
        </Stack>

        <Stack direction="row" spacing={2}>
          <Iconify icon="ic:round-business-center" width={24} />

          <Box sx={{ typography: "body2" }}>
            {info.role} {`at `}
            <Link variant="subtitle2" color="inherit">
              {info.company}
            </Link>
          </Box>
        </Stack>

        <Stack direction="row" spacing={2}>
          <Iconify icon="material-symbols:school-outline-rounded" width={24} />

          <Box sx={{ typography: "body2" }}>
            {`Studied at `}
            <Link variant="subtitle2" color="inherit">
              {info.school}
            </Link>
          </Box>
        </Stack>

        <Stack direction="row" spacing={2}>
          <Iconify icon="heroicons:user-group" width={24} />

          <Box sx={{ typography: "body2" }}>
            {`User Group `}
            <Link variant="subtitle2" color="error">
              {userGroup}
            </Link>
          </Box>
        </Stack>
      </Stack>
    </Card>
  );

  const renderSocials = (
    <Card>
      <Stack
        direction="row"
        spacing={2}
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <CardHeader title="Social" />
        <IconButton aria-label="Edit" onClick={() => setShowSocialEdit(true)}>
          <CreateIcon />
        </IconButton>
      </Stack>

      <Stack spacing={2} sx={{ p: 3 }}>
        {_socials.map((link) => (
          <Stack
            key={link.name}
            spacing={2}
            direction="row"
            sx={{ wordBreak: "break-all", typography: "body2" }}
          >
            <Iconify
              icon={link.icon}
              width={24}
              sx={{
                flexShrink: 0,
                color: link.color,
              }}
            />
            <Link color="inherit">
              {link.value === "facebook" && info.socialLinks.facebook}
              {link.value === "instagram" && info.socialLinks.instagram}
              {link.value === "linkedin" && info.socialLinks.linkedin}
              {link.value === "twitter" && info.socialLinks.x}
            </Link>
          </Stack>
        ))}
      </Stack>
    </Card>
  );

  const renderSkills = (
    <Card>
      <Stack
        direction="row"
        spacing={2}
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <CardHeader title="Skills" />
        <IconButton aria-label="Add" onClick={() => setShowAddSkill(true)}>
          <AddCircleOutlineIcon />
        </IconButton>
      </Stack>

      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {info.skills.list.map((s, index) => {
          return (
            <ListItem key={index}>
              <ListItemAvatar>
                <Avatar>
                  <BuildIcon />
                </Avatar>
              </ListItemAvatar>

              <Stack
                direction="row"
                spacing={2}
                sx={{
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <ListItemText primary={s.name} />

                <IconButton key={s.name} aria-label="delete" onClick={() => handleRemoveSkill(s.name)}>
                  <DeleteIcon />
                </IconButton>
              </Stack>
            </ListItem>
          );
        })}
      </List>
    </Card>
  );

  const renderBasicInfo = (
    <Card>
      <CardHeader title="Basic Info" sx={{ marginBottom: "20px" }} />

      <Stack spacing={2.5} sx={{ alignItems: "center" }}>
        <TextField
          label="Mail"
          variant="outlined"
          value={mail}
          onChange={(e) => setMail(e.target.value)}
          sx={{ width: "95%" }}
        />

        <TextField
          label="First Name"
          variant="outlined"
          value={fname}
          onChange={(e) => setFname(e.target.value)}
          sx={{ width: "95%" }}
        />

        <TextField
          label="Last Name"
          variant="outlined"
          value={lname}
          onChange={(e) => setLname(e.target.value)}
          sx={{ width: "95%" }}
        />

        <TextField
          label="Role"
          variant="outlined"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          sx={{ width: "95%" }}
        />

        <LoadingButton
          fullWidth
          color="primary"
          size="large"
          variant="contained"
          loading={isLoading}
          onClick={handleSaveBasicInfo}
          sx={{ width: "20%", marginBottom: "10px" }}
        >
          Update
        </LoadingButton>
        {error && (
          <>
            <Iconify icon="line-md:alert-twotone" width={20} color="red" />
            <Typography
              variant="caption"
              gutterBottom
              color="error"
              sx={{ width: "100%", marginBottom: "10px" }}
            >
              {error}
            </Typography>
          </>
        )}
      </Stack>
    </Card>
  );

  const renderPassword = (
    <Card sx={{ marginTop: "20px" }}>
      <CardHeader title="Reset Password" sx={{ marginBottom: "20px" }} />

      <Stack spacing={2.5} sx={{ alignItems: "center" }}>
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          sx={{ width: "95%" }}
        />

        <TextField
          label="Confirm Password"
          variant="outlined"
          type="password"
          value={pass2}
          onChange={(e) => setPass2(e.target.value)}
          sx={{ width: "95%" }}
        />

        <LoadingButton
          fullWidth
          color="primary"
          size="large"
          variant="contained"
          loading={isLoading}
          onClick={handleResetPass}
          sx={{ width: "20%", marginBottom: "10px" }}
        >
          Update Password
        </LoadingButton>
        {error && (
          <>
            <Iconify icon="line-md:alert-twotone" width={20} color="red" />
            <Typography variant="caption" gutterBottom color="error">
              {error}
            </Typography>
          </>
        )}
      </Stack>
    </Card>
  );

  useEffect(() => {
    setMail(user.details.mail);
    setFname(user.details.fname);
    setLname(user.details.lname);
    setRole(user.details.role);
    setUserGroup(user.details.user_group);
    setProfileImg(user.details.logo);
  }, [user.version]);

  return (
    <>
      <Grid container spacing={3}>
        {!!infoMsg && <Alert severity="success">{infoMsg}</Alert>}

        <Grid xs={12} md={12} lg={12}>
          <BreadHeader
            spacing={2}
            variant="overline"
            headers={[{ name: "User" }, { name: "Profile" }]}
          />
        </Grid>

        <Grid xs={12} md={12} lg={12}>
          <Stack spacing={3}>
            <Avatar
              alt="Remy Sharp"
              src={profileImg}
              sx={{ width: 240, height: 240, alignSelf: "center" }}
            />
            <Stack
              direction="row"
              spacing={2}
              variant="contained"
              aria-label="Basic button group"
              sx={{ alignSelf: "center" }}
            >
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
                color="warning"
              >
                Change
                <VisuallyHiddenInput
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  multiple
                />
              </Button>
              <Button color="error" onClick={handleRemoveLogo}>Remove</Button>
            </Stack>
          </Stack>
        </Grid>

        <Grid xs={12} md={6} lg={6}>
          {renderAbout}
        </Grid>

        <Grid xs={12} md={6} lg={6}>
          {renderSocials}
        </Grid>

        <Grid xs={12} md={6} lg={6}>
          {renderBasicInfo}
          {renderPassword}
        </Grid>

        <Grid xs={12} md={6} lg={6}>
          {renderSkills}
        </Grid>




      </Grid>

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={opensnakebar}
        onClose={() => null}
        message={snakeMessgae}
        key={"top" + "center"}
      />

      <EditProfileAbout
        show={showAboutEdit}
        handlesubmit={handleEditAbout}
        aboutIniData={info}
      />
      <EditProfileSocial
        show={showSocialEdit}
        handlesubmit={handleEditSocial}
        socialsIniData={info}
      />
      <AddUserSkills show={showAddSkill} handlesubmit={handleAddSkill} />
    </>
  );
}
