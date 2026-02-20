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
import {useCompetition} from "src/hooks/useCompetition";
// components
import { useSettingsContext } from 'src/components/settings';
import competIcon from 'src/assets/illustrations/ic_compe_ana.svg';
import PageTitle from "src/components/PageTitle/PageTitle";
import CustomTextField from "src/components/Texts/CustomTextField";
import {useGoogleAi} from "src/hooks/useGoogleAi";
// ----------------------------------------------------------------------


export default function NewMarketAnalysis() {
  const { id } = useParams();
  const { competition, competitionError, competitionLoading, addNewComp, editComp } = useCompetition();
  const settings = useSettingsContext();
  const mdUp = useResponsive('up', 'md');
  const [name, setName] = useState(id === undefined ? '' : competition.details.find(i => Number(i.id) === Number(id)).com);
  const [nameError, setNameError] = useState(false);
  const [det, setDet] = useState(id === undefined ? '' : competition.details.find(i => Number(i.id) === Number(id)).det);
  const [detError, setDetError] = useState(false);
  const [detailsType, setDetailsType] = useState(id === undefined ? 'Mission' : competition.details.find(i => Number(i.id) === Number(id)).det_type);
  const [btnLabel] = useState(id === undefined ? 'Create Competitor' : 'Update Competitor');
  const [pgLabel] = useState(id === undefined ? 'New Competitor' : 'Update Competitor');
  const [openSnake, setOpenSnake] = useState(false);
  const [snakeMessage, setSnakeMessage] = useState('Competition has been added.');
  const {generateDescription, aiWait} = useGoogleAi();



  const resetFieldsError = () => {
    setNameError(false)

  };

  const resetFieldsTexts = () => {
    setDet('')
    setDetailsType('Mission')
  };

  const handleGenerateAi = () => {
      generateDescription(`${name} product ${detailsType}`).then(result => {
        setDet(result)
      })

  };

  const checkData = () => {
    resetFieldsError()

    if(name === '') {
      setNameError(true)
      return false
    }

    if(det === '') {
      setDetError(true)
      return false
    }


    return true
  };

  const handleSubmit = () => {
    if (checkData()){
      const comp = {
        id,
        com: name,
        detailsType,
        det: det,
      }
      if (id === undefined) {
        addNewComp(comp).then( (result) => {
                                       if (result) {
                                         resetFieldsTexts()
                                         setOpenSnake(true)
                                       }

                                     }
        )
      } else {
        editComp(comp).then(result => {
          if (result) {
            setSnakeMessage('Competition has been updated')
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
          {competitionError !== '' &&
           <Typography variant="body2" sx={{ color: 'red' }}>
             {competitionError}
           </Typography>
          }

          <LoadingButton variant="contained" size="large" loading={competitionLoading} onClick={handleSubmit}>
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
                Assess Competition
              </Typography>

              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Analyze your competitors' strengths, weaknesses, strategies, and market share.
              </Typography>

              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Strategic Differentiation: Helps you identify unique selling propositions (USPs) and build a product that stands out.
                Pricing Strategy: Provides context for setting competitive prices.
                Users review are very important to improve the weakness of other in your product.
              </Typography>

              <CardMedia
                component="img"
                alt="product"
                height="350"
                image={competIcon}
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
            <CustomTextField label="Company Name" value={name} onChange={(v) => setName(v)} error={nameError} helperText={'*Company is Required'}/>

            <Stack direction="row" spacing={1} >
              <CustomTextField label="Details" multiline rows={3} value={det} onChange={(v) => setDet(v)} error={detError} helperText={'*Details is Required'}/>
              <LoadingButton variant="text" sx={{width: '10%'}} onClick={handleGenerateAi} loading={aiWait}>A.I</LoadingButton>
            </Stack>
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
                  value={detailsType}
                  label="Details Type"
                  onChange={(e) => setDetailsType(e.target.value)}
                >
                  <MenuItem sx={{ color: '#3a86ff', '&:hover': { backgroundColor: '#3a86ff', color: 'black' }, }} value={'Mission'}>Mission</MenuItem>
                  <MenuItem sx={{ color: '#3a86ff', '&:hover': { backgroundColor: '#3a86ff', color: 'black' }, }} value={'Pricing'}>Pricing</MenuItem>
                  <MenuItem sx={{ color: '#3a86ff', '&:hover': { backgroundColor: '#3a86ff', color: 'black' }, }} value={'Top Feature'}>Top Feature</MenuItem>
                  <MenuItem sx={{ color: '#3a86ff', '&:hover': { backgroundColor: '#3a86ff', color: 'black' }, }} value={'Strength'}>Strength</MenuItem>
                  <MenuItem sx={{ color: '#3a86ff', '&:hover': { backgroundColor: '#3a86ff', color: 'black' }, }} value={'Weakness'}>Weakness</MenuItem>
                  <MenuItem sx={{ color: '#3a86ff', '&:hover': { backgroundColor: '#3a86ff', color: 'black' }, }} value={'Differentiation'}>Differentiation</MenuItem>
                  <MenuItem sx={{ color: '#3a86ff', '&:hover': { backgroundColor: '#3a86ff', color: 'black' }, }} value={'Market Target'}>Market Target</MenuItem>
                  <MenuItem sx={{ color: '#3a86ff', '&:hover': { backgroundColor: '#3a86ff', color: 'black' }, }} value={'Market Share'}>Market Share</MenuItem>
                  <MenuItem sx={{ color: '#3a86ff', '&:hover': { backgroundColor: '#3a86ff', color: 'black' }, }} value={'User Review'}>User Review</MenuItem>
                </Select>
              </FormControl>

            </Box>


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

