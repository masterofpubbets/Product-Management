import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from "prop-types";
import * as Yup from "yup";
import { useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// @mui
import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
// assets
import { countries } from "src/assets/data";
// components
import Iconify from "src/components/iconify";
import { useSnackbar } from "src/components/snackbar";
import FormProvider, {
  RHFTextField,
  RHFAutocomplete,
} from "src/components/hook-form";
// ----------------------------------------------------------------------
import { useUsers } from "src/hooks/useUsers";

export default function NewUser({ currentUser }) {
  const { error, userAdded, createUser, inProgress } = useUsers();
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const NewUserSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .required("Email is required")
      .email("Email must be a valid email address"),
    project: Yup.string().required("Project is required"),
    country: Yup.string().required("Country is required"),
    company: Yup.string().required("Company is required"),
    department: Yup.string().required("Department is required"),
    role: Yup.string().required("Role is required"),
    group: Yup.string().required("Group is required"),
    pass: Yup.string().required("Initial Password is required"),
  });

  const defaultValues = useMemo(
    () => ({
      name: currentUser?.name || "",
      project: currentUser?.project || "",
      role: currentUser?.role || "",
      email: currentUser?.email || "",
      company: currentUser?.company || "",
      department: currentUser?.department || "",
      country: currentUser?.country || "",
      avatarUrl: currentUser?.avatarUrl || null,
      phoneNumber: currentUser?.phoneNumber || "",
      isVerified: currentUser?.isVerified || true,
      pass: "",
      group: "guest",
    }),
    [currentUser]
  );

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      createUser(data);
    } catch (error) {
      console.error(error);
    }
  });

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue("avatarUrl", newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  const handleBack = () => {
    navigate(-1)
  };

  useEffect(() => {
    reset();
    enqueueSnackbar(currentUser ? "Update success!" : "Create success!");
  }, [userAdded])

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        <Grid xs={12} md={12} lg={12}>
          <Stack direction="row" spacing={2}>
            <Iconify icon="line-md:account-add" width={30} color="blue" />
            <Typography variant="h6" gutterBottom>
              Create New User
            </Typography>
          </Stack>
        </Grid>

        <Grid xs={12} md={12} lg={12}>
          <Card sx={{ p: 3 }}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: "repeat(1, 1fr)",
                sm: "repeat(2, 1fr)",
              }}
            >
              <RHFTextField name="name" label="Full Name" />
              <RHFTextField name="email" label="Email Address" />
              <RHFTextField name="project" label="Project" />
              <RHFAutocomplete
                name="country"
                label="Country"
                options={countries.map((country) => country.label)}
                getOptionLabel={(option) => option}
                isOptionEqualToValue={(option, value) => option === value}
                renderOption={(props, option) => {
                  const { code, label, phone } = countries.filter(
                    (country) => country.label === option
                  )[0];

                  if (!label) {
                    return null;
                  }

                  return (
                    <li {...props} key={label}>
                      <Iconify
                        key={label}
                        icon={`circle-flags:${code.toLowerCase()}`}
                        width={28}
                        sx={{ mr: 1 }}
                      />
                      {label} ({code}) +{phone}
                    </li>
                  );
                }}
              />
              <RHFTextField name="company" label="Company" />
              <RHFTextField name="department" label="Department" />
              <RHFTextField name="role" label="Role" />
              <RHFTextField name="group" label="Group" />
              <RHFTextField name="pass" label="Init Password" type="password" />
            </Box>

            <Stack
              direction="row"
              spacing={2}
              sx={{
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <Button onClick={handleBack} variant="contained" color='warning'>Back</Button>
              <LoadingButton
                type="submit"
                variant="contained"
                loading={inProgress}
              >
                {!currentUser ? "Create" : "Save"}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>

        {error !== "" && (
          <Grid xs={12} md={12} lg={12}>
            <Stack direction="row" spacing={2}>
              <Iconify icon="line-md:alert-twotone" width={20} color="red" />
              <Typography variant="caption" gutterBottom color="error">
                {error}
              </Typography>
            </Stack>
          </Grid>
        )}
      </Grid>
    </FormProvider>
  );
}

NewUser.propTypes = {
  currentUser: PropTypes.object,
};
