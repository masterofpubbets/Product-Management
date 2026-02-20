import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
// @mui
import LoadingButton from "@mui/lab/LoadingButton";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
// auth
import { useAuthContext } from "src/auth/hooks/use-auth-context";
// components
import Iconify from "src/components/iconify";
// ----------------------------------------------------------------------

export default function JwtLoginView() {
  const { error, login, register, isLoading } = useAuthContext();
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [registerDone, setRegister] = useState(false);
  const [mail, setMail] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [role, setRole] = useState("");
  const [pass, setPass] = useState("");
  const [pass2, setPass2] = useState("");



  const handleSubmit = async () => {
    try {
      setRegister(false);
      if (isRegister) {
        const result = await register(mail, pass, fname, lname, role, pass2);
        if (result) {
          setIsRegister(false);
          setRegister(true)
        }
      } else {
        
        const result2 = await login(mail, pass);
        if (result2) {
          navigate("/dashboard");
        }
      }
    } catch (error) {
      reset();
      setErrorMsg(typeof error === "string" ? error : error.message);
    }
  };

  const renderHead = (
    <Stack spacing={1} sx={{ mb: 5 }}>
      <Typography variant="h5">Sign in</Typography>
    </Stack>
  );

  const renderForm = (
    <Stack spacing={2.5}>
      {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>}

      <TextField
        label="Mail"
        variant="outlined"
        value={mail}
        onChange={(e) => setMail(e.target.value)}
      />
      <TextField
        label="Password"
        variant="outlined"
        type="password"
        value={pass}
        onChange={(e) => setPass(e.target.value)}
      />

      <LoadingButton
        fullWidth
        color="inherit"
        size="large"
        variant="contained"
        loading={isLoading}
        onClick={handleSubmit}
      >
        Login
      </LoadingButton>

      <LoadingButton
        onClick={() => {
          setIsRegister(true);
        }}
        fullWidth
        color="warning"
        size="large"
        variant="contained"
        loading={isLoading}
      >
        Register
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
  );

  const renderRegisterForm = (
    <Stack spacing={2.5}>
      {!!registerDone && <Alert severity="success">{`User ${fname} has been added.`}</Alert>}

      <TextField
        label="Mail"
        variant="outlined"
        value={mail}
        onChange={(e) => setMail(e.target.value)}
      />

      <TextField
        label="First Name"
        variant="outlined"
        value={fname}
        onChange={(e) => setFname(e.target.value)}
      />

      <TextField
        label="Last Name"
        variant="outlined"
        value={lname}
        onChange={(e) => setLname(e.target.value)}
      />

      <TextField
        label="Role"
        variant="outlined"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      />

      <TextField
        label="Password"
        variant="outlined"
        type="password"
        value={pass}
        onChange={(e) => setPass(e.target.value)}
      />

      <TextField
        label="Confirm Password"
        variant="outlined"
        type="password"
        value={pass2}
        onChange={(e) => setPass2(e.target.value)}
      />

      <LoadingButton
        fullWidth
        color="inherit"
        size="large"
        variant="contained"
        loading={isLoading}
        onClick={handleSubmit}
      >
        Create
      </LoadingButton>

      <LoadingButton
        onClick={() => {
          setIsRegister(false);
        }}
        fullWidth
        color="error"
        size="large"
        variant="contained"
        loading={isLoading}
      >
        Cancel
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
  );

  return (
    <div>
      {renderHead}

      {!isRegister && renderForm}
      {isRegister && renderRegisterForm}
    </div>
  );
}
