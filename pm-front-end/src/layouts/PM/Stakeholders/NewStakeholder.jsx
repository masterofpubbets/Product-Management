import {useState} from "react";
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CardMedia from "@mui/material/CardMedia";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Snackbar from '@mui/material/Snackbar';
// hooks
import { useResponsive } from 'src/hooks/use-responsive';
import {useStakeholders} from "src/hooks/useStakeholders";
// components
import { useSettingsContext } from 'src/components/settings';
import stLogo from 'src/assets/icons/st_analysis.svg';
import PageTitle from "src/components/PageTitle/PageTitle";
import SelectCountry from "src/components/Country/SelectCountry";
import CustomTextField from "src/components/Texts/CustomTextField";
// ----------------------------------------------------------------------


export default function NewStakeholder() {
  const settings = useSettingsContext();
  const mdUp = useResponsive('up', 'md');
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState(false);
  const [des, setDes] = useState('');
  const [org, setOrg] = useState('');
  const [orgError, setOrgError] = useState(false);
  const [contact, setContact] = useState('');
  const [contactError, setContactError] = useState(false);
  const [role, setRole] = useState('');
  const [roleError, setRoleError] = useState(false);
  const [cat, setCat] = useState('Manage Closely');
  const [country, setCountry] = useState('Indonesia');
  const [lang, setLang] = useState('');
  const [langError, setLangError] = useState(false);
  const { stakeholderError, stakeholderLoading, addNewStakeholder } = useStakeholders();
  const [openSnake, setOpenSnake] = useState(false);
  const [snakeMessage, setSnakeMessage] = useState('Stakeholder has been added.');


  const resetFieldsError = () => {
    setNameError(false)
    setOrgError(false)
    setOrgError(false)
    setContactError(false)
    setRoleError(false)
    setLangError(false)
  };

  const resetFieldsTexts = () => {
    setName('')
    setDes('')
    setOrg('')
    setContact('')
    setRole('')
    setCat('')
  };

  const checkData = () => {
    resetFieldsError()

    if(name === '') {
      setNameError(true)
      return false
    }

    if(org === '') {
      setOrgError(true)
      return false
    }

    if(org === '') {
      setOrgError(true)
      return false
    }

    if(contact === '') {
      setContactError(true)
      return false
    }

    if(role === '') {
      setRoleError(true)
      return false
    }

    if(country === '') {
      return false
    }

    if(lang === '') {
      setLangError(true)
      return false
    }
    return true
  };

  const handleSubmit = () => {
    if (checkData()){
      const stakeholder = {
        name: name,
        organization: org,
        role: role,
        contact: contact,
        des: des,
        category: cat,
        country: country,
        lang: lang
      }
      addNewStakeholder(stakeholder).then( () => {
        resetFieldsTexts()
        setOpenSnake(true)
        }
      )
    }
  };


  const renderDetails = (
    <>
      {mdUp && (
        <>
          <Grid md={4}>
            <Stack spacing={3} sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 0.5 }}>
                Stakeholder analysis
              </Typography>

              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Is a systematic process to identify individuals or groups (stakeholders) affected by or influencing a project/decision,
                assess their interests and power, and develop strategies to manage those relationships effectively for better outcomes.
              </Typography>

              <Typography variant="h6" sx={{ mb: 0.5, mt: '20px' }}>
                Power
              </Typography>

              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Understanding their needs/expectations, grouping them by influence/interest (often using a power/interest grid),
                and planning communication and engagement to mitigate risks, manage expectations, and gain support.
              </Typography>

              <CardMedia
                component="img"
                alt="product"
                height="350"
                image={stLogo}
                sx={{ alignSelf: 'center', objectFit: 'contain', width: '100%'}}
              />
            </Stack>
          </Grid>
        </>
      )}

      <Grid xs={12} md={8}>
        <Card>
          {!mdUp && <CardHeader title="Details" />}

          <Stack spacing={3} sx={{ p: 3 }}>
            <CustomTextField label="Stakeholder Name" value={name} onChange={(v) => setName(v)} error={nameError} helperText={'*Name is Required'}/>

            <CustomTextField label="Description" multiline rows={3} value={des} onChange={(v) => setDes(v)}/>

            <CustomTextField label="Organization" value={org} onChange={(v) => setOrg(v)} error={orgError} helperText={'*Organization is Required'}/>

            <CustomTextField label="Contacts" multiline rows={4} value={contact} onChange={(v) => setContact(v)} error={contactError} helperText={'*Contact is Required'}/>

            <Stack spacing={3} sx={{ p: 3 }}>
              <Box
                columnGap={2}
                rowGap={3}
                display="grid"
                gridTemplateColumns={{
                  xs: 'repeat(1, 1fr)',
                  md: 'repeat(2, 1fr)',
                }}
              >
                <CustomTextField label="Product Role" value={role} onChange={(v) => setRole(v)} error={roleError} helperText={'*Role is Required'}/>

                <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-helper-label">Category</InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={cat}
                  label="Category"
                  onChange={(e) => setCat(e.target.value)}
                >
                  <MenuItem sx={{ color: '#ff3d00', '&:hover': { backgroundColor: '#ff3d00', color: 'white' }, }} value={'Manage Closely'}>Manage Closely</MenuItem>
                  <MenuItem sx={{ color: '#4e342e', '&:hover': { backgroundColor: '#4e342e', color: 'white' }, }} value={'Keep Satisfied'}>Keep Satisfied</MenuItem>
                  <MenuItem sx={{ color: 'black', '&:hover': { backgroundColor: '#ffea00', color: 'black' }, }} value={'Keep Informed'}>Keep Informed</MenuItem>
                  <MenuItem sx={{ color: '#757575', '&:hover': { backgroundColor: '#757575', color: 'white' }, }} value={'Monitor'}>Monitor</MenuItem>
                </Select>
                </FormControl>

                <SelectCountry required={true} iniCountry={country} handleChange={(e) => setCountry(e)}/>

                <CustomTextField label="Spoken Language" value={lang} onChange={(v) => setLang(v)} error={langError} helperText={'*Language is Required'}/>

              </Box>

            </Stack>

          </Stack>
        </Card>
      </Grid>
    </>
  );


  const renderActions = (
    <>
      {mdUp && <Grid md={4} />}
      <Grid xs={12} md={8} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
        <Stack direction="row" spacing={2} sx={{alignItems: "center",}}>
          {stakeholderError !== '' &&
           <Typography variant="body2" sx={{ color: 'red' }}>
             {stakeholderError}
           </Typography>
          }

          <LoadingButton variant="contained" size="large" loading={stakeholderLoading} onClick={handleSubmit}>
            {'Create Stakeholder'}
          </LoadingButton>
        </Stack>
      </Grid>
    </>
  );

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <PageTitle title={"New Stakeholder"} />

        <Grid container spacing={3}>
          {renderDetails}

          {renderActions}
        </Grid>

      <Snackbar
        open={openSnake}
        autoHideDuration={2000}
        onClose={() => setOpenSnake(false)}
        message={snakeMessage}
      />

    </Container>
  );
}

