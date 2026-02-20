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
import Switch from '@mui/material/Switch';
import Snackbar from '@mui/material/Snackbar';
import Button from '@mui/material/Button';
// hooks
import { useResponsive } from 'src/hooks/use-responsive';
import {useFeatures} from "src/hooks/useFeatures";
import {useGoogleAi} from "src/hooks/useGoogleAi";
// components
import { useSettingsContext } from 'src/components/settings';
import kanoIcon from 'src/assets/illustrations/kano_model.svg';
import PageTitle from "src/components/PageTitle/PageTitle";
import CustomTextField from "src/components/Texts/CustomTextField";
import FullScreenDialog from "src/components/Dialogs/FullScreenDialog";
import Okr from "src/layouts/PM/Okr/Okr";
// ----------------------------------------------------------------------


export default function NewCurrentFeature() {
  const { id } = useParams();
  const { features, featureError, featureLoading, addNewFeature, editFeature } = useFeatures();
  const settings = useSettingsContext();
  const mdUp = useResponsive('up', 'md');
  const [name, setName] = useState(id === undefined ? '' : features.details.find(i => Number(i.id) === Number(id)).name);
  const [nameError, setNameError] = useState(false);
  const [des, setDes] = useState(id === undefined ? '' : features.details.find(i => Number(i.id) === Number(id)).des);
  const [timeToUse, setTimeToUse] = useState(id === undefined ? 0 : features.details.find(i => Number(i.id) === Number(id)).time_to_use);
  const [timeToUseError, setTimeToUseError] = useState(false);
  const [numberOfUser, setNumberOfUser] = useState(id === undefined ? 0 : features.details.find(i => Number(i.id) === Number(id)).num_of_use);
  const [numberOfUserError, setNumberOfUserError] = useState(false);
  const [kano, setKano] = useState(id === undefined ? 'Must Have' : features.details.find(i => Number(i.id) === Number(id)).kano);
  const [mosco, setMosco] = useState(id === undefined ? 'Must Haves' : features.details.find(i => Number(i.id) === Number(id)).moscow);
  const [iniId, setIniId] = useState(id === undefined ? null : features.details.find(i => Number(i.id) === Number(id)).iniid);
  const [iniName, setIniName] = useState(id === undefined ? '' : features.details.find(i => Number(i.id) === Number(id)).ini_name);
  const [discontinue, setDiscontinue] = useState(id === undefined ? false : features.details.find(i => Number(i.id) === Number(id)).discon);
  const [current, setCurrent] = useState(id === undefined ? true : features.details.find(i => Number(i.id) === Number(id)).current);
  const [btnLabel] = useState(id === undefined ? 'Create Feature' : 'Update Feature');
  const [pgLabel] = useState(id === undefined ? 'New Feature' : 'Update Feature');
  const {generateDescription, aiWait} = useGoogleAi();

  const [openSnake, setOpenSnake] = useState(false);
  const [snakeMessage, setSnakeMessage] = useState('Feature has been added.');
  const [openDialog, setOpenDialog] = useState(false);



  const handleGenerateAi = () => {
    generateDescription(`${name} software feature`).then(result => {
      setDes(result)
    })
  };

  const resetFieldsError = () => {
    setNameError(false)

  };

  const handleInitiativeSelect = (id, iName) => {
    setOpenDialog(false)
    setIniName(iName)
    setIniId(id)
  };

  const clearInitiativeSelect = (id, iName) => {
    setOpenDialog(false)
    setIniName('')
    setIniId(null)
  };

  const resetFieldsTexts = () => {
    setName('')
    setDes('')
    setTimeToUse(0)
    setNumberOfUser(0)
    setKano('Must Have')
  };

  const isNumeric = (str) => {
    return Number.isFinite(+str);
  };

  const checkData = () => {
    resetFieldsError()

    if(name === '') {
      setNameError(true)
      return false
    }

    if(!isNumeric(timeToUse)) {
      setTimeToUseError(true)
      return false
    }

    if(!isNumeric(numberOfUser)) {
      setNumberOfUserError(true)
      return false
    }

    return true
  };

  const handleSubmit = () => {
    if (checkData()){
      const feature = {
        id,
        name,
        timeToUse,
        numberOfUser,
        kano,
        des: des,
        discontinue,
        current,
        mosco,
        iniId
      }
      if (id === undefined) {
        addNewFeature(feature).then( (result) => {
                                       if (result) {
                                         resetFieldsTexts()
                                         setOpenSnake(true)
                                       }

                                     }
        )
      } else {
        editFeature(feature).then(result => {
          if (result) {
            setSnakeMessage('Feature has been updated')
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
          {featureError !== '' &&
           <Typography variant="body2" sx={{ color: 'red' }}>
             {featureError}
           </Typography>
          }

          <LoadingButton variant="contained" size="large" loading={featureLoading} onClick={handleSubmit}>
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
              <Typography variant="h6" sx={{ mb: 0.5 }}>
                Kano Model
              </Typography>

              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                The Kano Model is a powerful tool for product managers to understand how different features impact customer satisfaction.
                It moves beyond simply asking “Do you like this feature?” and digs deeper into why a customer feels a certain way.
              </Typography>

              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Core Idea: Customer satisfaction isn't just about the presence or absence of a feature; it’s about the type of feature.
              </Typography>

              <CardMedia
                component="img"
                alt="product"
                height="350"
                image={kanoIcon}
                sx={{ alignSelf: 'center', objectFit: 'contain', width: '100%'}}
              />

              <Typography variant="h6" sx={{ mb: 0.5 }}>
                Mosco
              </Typography>

              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Must Haves
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Provide the Minimum Viable Product (MVP) of requirements which the project guarantees to deliver. This may be defined using some of the following items:
                These are non-negotiable,
                Can’t deliver on target date without this,
                Not legal without it,
                Unsafe without it,
                Can’t deliver the business case without it
              </Typography>

              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Should Haves
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Important but not vital,
                May be painful to leave out, but the solution is still viable
                May need some kind of workaround, e.g. management of expectations, some inefficiency, an existing solution, or a little extra paperwork etc.
                A Should Have may be differentiated from a Could Have by reviewing the degree of pain caused by it not being met, in terms of business value or numbers of people affected.
              </Typography>

              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Could Haves
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Wanted or desirable but less important
                Less impact if left out (compared with a Should Have)
              </Typography>

              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Won’t Haves
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                These are the requirements which the project team has agreed it will not deliver. They are recorded in the Prioritised Requirements List where they help clarify the scope of the project and to avoid being reintroduced ‘via the back door’ at a later date. This helps to manage expectations that some requirements will simply not make it into the delivered solution, at least not this time around.
                These priorities should always be under review even during the project. If or any new work arises during the project priorities can be upgraded or downgraded as per the requirement.
              </Typography>

            </Stack>
          </Grid>
        </>
      )}

      <Grid xs={12} md={8}>
        <Card>
          {!mdUp && <CardHeader title="Details" />}

          <Stack spacing={3} sx={{ p: 3 }}>
            <CustomTextField label="Feature Name" value={name} onChange={(v) => setName(v)} error={nameError} helperText={'*Name is Required'}/>

            <Stack direction="row" spacing={1} >
              <CustomTextField label="Description" multiline rows={3} value={des} onChange={(v) => setDes(v)}/>
              <LoadingButton variant="text" sx={{width: '10%'}} onClick={handleGenerateAi} loading={aiWait}>A.I</LoadingButton>
            </Stack>

            <CustomTextField label="Time to Use" value={timeToUse} onChange={(v) => setTimeToUse(v)} error={timeToUseError} helperText={'Time to use is not a number'}/>

            <CustomTextField label="Number of Users" value={numberOfUser} onChange={(v) => setNumberOfUser(v)} error={numberOfUserError} helperText={'Number of users is not a number'}/>

              <Box
                columnGap={2}
                rowGap={3}
                display="grid"
                gridTemplateColumns={{
                  xs: 'repeat(1, 1fr)',
                  md: 'repeat(2, 1fr)',
                }}
              >

                <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel id="demo-simple-select-helper-label">Kano Model</InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={kano}
                    label="Kano Model"
                    onChange={(e) => setKano(e.target.value)}
                  >
                    <MenuItem sx={{ color: '#ff3d00', '&:hover': { backgroundColor: '#ff3d00', color: 'white' }, }} value={'Unwanted'}>Unwanted</MenuItem>
                    <MenuItem sx={{ color: '#f77f00', '&:hover': { backgroundColor: '#f77f00', color: 'white' }, }} value={'Must Have'}>Must Have</MenuItem>
                    <MenuItem sx={{ color: '#3a86ff', '&:hover': { backgroundColor: '#3a86ff', color: 'black' }, }} value={'Performance'}>Performance</MenuItem>
                    <MenuItem sx={{ color: '#5c8001', '&:hover': { backgroundColor: '#7cb518', color: 'white' }, }} value={'Delighter'}>Delighter</MenuItem>
                    <MenuItem sx={{ color: '#757575', '&:hover': { backgroundColor: '#757575', color: 'white' }, }} value={'Unknown'}>Unknown</MenuItem>
                  </Select>
                </FormControl>

                <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel id="demo-simple-select-helper-label">Mosco</InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={mosco}
                    label="Mosco"
                    onChange={(e) => setMosco(e.target.value)}
                  >
                    <MenuItem sx={{ color: '#5c8001', '&:hover': { backgroundColor: '#7cb518', color: 'white' }, }} value={'Must Haves'}>Must Haves</MenuItem>
                    <MenuItem sx={{ color: '#f77f00', '&:hover': { backgroundColor: '#f77f00', color: 'white' }, }} value={'Should Haves'}>Should Haves</MenuItem>
                    <MenuItem sx={{ color: '#3a86ff', '&:hover': { backgroundColor: '#3a86ff', color: 'black' }, }} value={'Could Haves'}>Could Haves</MenuItem>
                    <MenuItem sx={{ color: '#ff3d00', '&:hover': { backgroundColor: '#ff3d00', color: 'white' }, }} value={'Won’t Haves'}>Won’t Haves</MenuItem>
                  </Select>
                </FormControl>

              </Box>

            <Stack direction="row" spacing={6} >

              <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                <Typography>Discontinue</Typography>
                <Switch checked={!discontinue} inputProps={{ 'aria-label': 'ant design' }} onClick={(e) => setDiscontinue(!discontinue)}/>
                <Typography>Active</Typography>
              </Stack>

              <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                <Typography>Not Developed</Typography>
                <Switch checked={current} inputProps={{ 'aria-label': 'ant design' }} onClick={(e) => setCurrent(!current)}/>
                <Typography>Running</Typography>
              </Stack>

            </Stack>

            <Stack direction="row" spacing={6} >

              <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                <Button variant="contained" size={"small"} color={"warning"} onClick={() => setOpenDialog(true)}>Link Initiative</Button>
                <Button variant="contained" size={"small"} color={"warning"} onClick={clearInitiativeSelect}>Remove</Button>
                <Typography>{iniName}</Typography>
              </Stack>


            </Stack>

            {renderActions}


          </Stack>
        </Card>
      </Grid>
    </>
  );




  return (
      <>
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

        <FullScreenDialog show={openDialog} onClose={() => setOpenDialog(false)} title={"Select Initiative"}>
          <Okr withSelect={true} onInitiativeSelect={handleInitiativeSelect} />
        </FullScreenDialog>
      </>
  );
}

