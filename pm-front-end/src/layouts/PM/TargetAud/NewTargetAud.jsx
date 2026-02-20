import {useState} from "react";
import { useParams } from 'react-router-dom';
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
import {useTargetAud} from "src/hooks/useTargetAud";
// components
import { useSettingsContext } from 'src/components/settings';
import audIcon from 'src/assets/illustrations/ic_target_aud.svg';
import PageTitle from "src/components/PageTitle/PageTitle";
import CustomTextField from "src/components/Texts/CustomTextField";
// ----------------------------------------------------------------------


export default function NewTargetAud() {
  const { id } = useParams();
  const { targetAud, targetAudError, targetAudLoading, addNewTargetAud, editTargetAud } = useTargetAud();
  const settings = useSettingsContext();
  const mdUp = useResponsive('up', 'md');
  const [role, setRole] = useState(id === undefined ? '' : targetAud.details.find(i => Number(i.id) === Number(id)).role);
  const [age, setAge] = useState(id === undefined ? 18 : targetAud.details.find(i => Number(i.id) === Number(id)).age);
  const [ageError, setAgeError] = useState(false);
  const [edu, setEdu] = useState(id === undefined ? '' : targetAud.details.find(i => Number(i.id) === Number(id)).education);
  const [loc, setLoc] = useState(id === undefined ? '' : targetAud.details.find(i => Number(i.id) === Number(id)).location);
  const [problem, setProblem] = useState(id === undefined ? '' : targetAud.details.find(i => Number(i.id) === Number(id)).problem);
  const [gender, setGender] = useState(id === undefined ? 'Male' : targetAud.details.find(i => Number(i.id) === Number(id)).gender);
  const [interests, setInterests] = useState(id === undefined ? '' : targetAud.details.find(i => Number(i.id) === Number(id)).interests);
  const [behavioral, setBehavioral] = useState(id === undefined ? '' : targetAud.details.find(i => Number(i.id) === Number(id)).bahavioral);
  const [lifeStyle, setLifeStyle] = useState(id === undefined ? '' : targetAud.details.find(i => Number(i.id) === Number(id)).life_style);
  const [goal, setGoal] = useState(id === undefined ? '' : targetAud.details.find(i => Number(i.id) === Number(id)).goal);
  const [btnLabel] = useState(id === undefined ? 'Create User Persona' : 'Update User Persona');
  const [pgLabel] = useState(id === undefined ? 'New User Persona' : 'Update User Persona');
  const [openSnake, setOpenSnake] = useState(false);
  const [snakeMessage, setSnakeMessage] = useState('User Persona has been added.');


  const resetFieldsError = () => {
    setAgeError(false)

  };

  const resetFieldsTexts = () => {
    setRole('')
    setEdu('')
    setLoc('')
    setProblem('')
    setInterests('')
    setBehavioral('')
    setLifeStyle('')
    setGoal('')
  };

  const isNumeric = (str) => {
    return Number.isFinite(+str);
  };

  const checkData = () => {
    resetFieldsError()

    if(!isNumeric(age)) {
      setAgeError(true)
      return false
    }

    return true
  };

  const handleSubmit = () => {
    if (checkData()){
      const data = {
        id,
        role,
        age,
        education: edu,
        location: loc,
        problem,
        gender,
        interests,
        bahavioral: behavioral,
        life_style: lifeStyle,
        goal,
      }
      if (id === undefined) {
        addNewTargetAud(data).then( (result) => {
                                 if (result) {
                                   resetFieldsTexts()
                                   setOpenSnake(true)
                                 }

                               }
        )
      } else {
        editTargetAud(data).then(result => {
          if (result) {
            setSnakeMessage('User Persona has been updated')
            setOpenSnake(true)
          }
        })
      }

    }
  };

  const renderActions = (
    <>
      <Grid>
        <Stack
          direction="row"
          spacing={2}
          sx={{
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          {targetAudError !== '' &&
           <Typography variant="body2" sx={{ color: 'red' }}>
             {targetAudError}
           </Typography>
          }

          <LoadingButton variant="contained" size="large" loading={targetAudLoading} onClick={handleSubmit}>
            {btnLabel}
          </LoadingButton>

        </Stack>
      </Grid>
    </>
  );

  const renderDetails = (
    <>
      {mdUp && (
        <>
          <Grid md={4}>
            <Stack spacing={3} sx={{ p: 3 }}>

              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                The specific group of people a product, service, or message is intended to reach, identified by shared characteristics like demographics (age, income),
                psycho graphics (interests, lifestyle), behaviors, and location, to make marketing efforts more relevant,
                efficient, and successful by tailoring messages and campaigns directly to their needs and preferences.
              </Typography>

              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Why It's Important
                Relevance: Creates messages that resonate with potential customers.
                Efficiency: Prevents wasted resources on uninterested groups.
                Effectiveness: Leads to better campaign results and higher ROI.
                Product Development: Helps build products that solve real problems for specific users.
              </Typography>

              <CardMedia
                component="img"
                alt="product"
                height="350"
                image={audIcon}
                sx={{ alignSelf: 'center', objectFit: 'contain', width: '100%'}}
              />
            </Stack>
          </Grid>
        </>
      )}

      <Grid xs={12} md={8}>
        <Card>
          {!mdUp && <CardHeader title="Details" />}

          <Stack spacing={3} sx={{ p: 3, justifyContent: "center" }} >
            <Stack direction="row" spacing={1} >
              <CustomTextField label="Role" value={role} onChange={(v) => setRole(v)}/>
              <CustomTextField label="Age" value={age} onChange={(v) => setAge(v)} error={ageError} helperText={'*Age is not a number'}/>
            </Stack>

            <Stack
              direction="row"
              spacing={1}
              sx={{justifyContent: "center", alignItems: 'center', width: '100%'}}
            >
              <CustomTextField label="Location" value={loc} onChange={(v) => setLoc(v)}/>

              <Box
                columnGap={2}
                rowGap={3}
              >

                <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel id="demo-simple-select-helper-label">Gender</InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={gender}
                    label="Gender"
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <MenuItem value={'Male'}>Male</MenuItem>
                    <MenuItem value={'Female'}>Female</MenuItem>
                  </Select>
                </FormControl>

              </Box>

            </Stack>

            <CustomTextField label="Education" multiline rows={2} value={edu} onChange={(v) => setEdu(v)}/>
            <CustomTextField label="Problem" multiline rows={2} value={problem} onChange={(v) => setProblem(v)}/>
            <CustomTextField label="Goal" multiline rows={2} value={goal} onChange={(v) => setGoal(v)}/>
            <CustomTextField label="Interests" multiline rows={2} value={interests} onChange={(v) => setInterests(v)}/>
            <CustomTextField label="Behavioral" multiline rows={2} value={behavioral} onChange={(v) => setBehavioral(v)}/>
            <CustomTextField label="Life Style" multiline rows={2} value={lifeStyle} onChange={(v) => setLifeStyle(v)}/>

            {renderActions}

          </Stack>
        </Card>
      </Grid>
    </>
  );




  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <PageTitle title={pgLabel} />

      <Grid container spacing={3}>
        {renderDetails}
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

