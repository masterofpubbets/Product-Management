import {useState, useEffect} from "react";
import { useParams } from 'react-router-dom';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CardMedia from "@mui/material/CardMedia";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import Snackbar from '@mui/material/Snackbar';
import CancelIcon from '@mui/icons-material/Cancel';
// hooks
import { useResponsive } from 'src/hooks/use-responsive';
import {useStrategy} from "src/hooks/useStrategy";
// components
import { useSettingsContext } from 'src/components/settings';
import stLogo from 'src/assets/icons/goal_requirement.svg';
import PageTitle from "src/components/PageTitle/PageTitle";
import CustomTextField from "src/components/Texts/CustomTextField";
import EmptyContent from "src/components/empty-content";
// ----------------------------------------------------------------------


export default function NewStrategy() {
  const { editLevel, editGoalName } = useParams();
  const settings = useSettingsContext();
  const mdUp = useResponsive('up', 'md');
  const [level, setLevel] = useState(editLevel === undefined ? '' : editLevel);
  const [disabled, setDisabled] = useState(editLevel === undefined ? undefined : true);
  const [title, setTitle] = useState(editLevel === undefined ? 'New Strategy' : 'Edit Strategy');
  const [btnTitle, setBtnTitle] = useState(editLevel === undefined ? 'Create Strategy' : 'Edit Strategy');
  const [levelError, setLevelError] = useState(false);
  const [levelErrorMsg, setLevelErrorMsg] = useState('');
  const [goal, setGoal] = useState(editGoalName === undefined ? '' : editGoalName);
  const [goalError, setGoalError] = useState(false);
  const [req, setReq] = useState('');
  const [reqError, setReqError] = useState(false);
  const { strategy, strategyError, strategyLoading, addStrategy } = useStrategy();
  const [requirements, setRequirements] = useState([])
  const [openSnake, setOpenSnake] = useState(false);
  const [snakeMessage, setSnakeMessage] = useState('Stakeholder has been added.');
  const [error, setError] = useState('')


  useEffect(() => {
    if (editLevel !== undefined) {
      const g = strategy.details.filter(i => Number(i.level) === Number(editLevel));
      setRequirements(g[0].goals.find(i => i.goal === editGoalName).items)
    }
  }, [strategy.version])

  const resetFieldsError = () => {
    setLevelError(false)
    setGoalError(false)
    setReqError(false)
  };

  const restFilds = () => {
    setGoal('')
    setReq('')
    setRequirements([])
  };

  const isNumeric = (str) => {
    return Number.isFinite(+str);
  };

  const checkData = () => {
    resetFieldsError()

    if(level === '') {
      setLevelError(true)
      setLevelErrorMsg('Level is required')
      return false
    }

    if(!isNumeric(level)) {
      setLevelError(true)
      setLevelErrorMsg('Level is not a number')
      return false
    }

    if(goal === '') {
      setGoalError(true)
      return false
    }

    if(requirements.length === 0) {
      setReqError(true)
      return false
    }

    return true
  };

  const checkUniqueGoals = (st) => {
    let newGoals = []
    const goalLevel = strategy.details.find(s => Number(s.level) === Number(st.level))
    if (goalLevel === undefined) {
      newGoals = [{goal: st.goal, items: st.items}]
    } else {
      if (goalLevel.goals.find(g => g.goal === st.goal) !== undefined) {
        setError('Goal already exists in same level!')
        return []
      } else {
        newGoals.push(...goalLevel.goals)
        newGoals.push({goal: st.goal, items: st.items})
      }
    }
    return newGoals
  };

  const createStrategy = () => {
    setError('')
    if (checkData()){
      const st = {
        level,
        goal,
        items: requirements
      }
      const newGoals = checkUniqueGoals(st)
      if (newGoals.length > 0) {
        addStrategy(level,newGoals).then((result) => {
          if (result) {
            restFilds()
            setSnakeMessage('Strategy has been added.')
            setOpenSnake(true)
          }
        })
      }
    }
  };

  const editStrategy = () => {
    setError('')
    if (checkData()){
      const st = {
        level,
        goal,
        items: requirements
      }

      const g = strategy.details.filter(i => Number(i.level) === Number(editLevel));
      const otherGoal = g[0].goals.filter(i => i.goal !== editGoalName)
      const editGoal = {
        goal: editGoalName,
        items: requirements
      }
      const newGoals = [...otherGoal, editGoal]
      if (newGoals.length > 0) {
        addStrategy(level,newGoals).then((result) => {
          if (result) {
            setSnakeMessage('Strategy has been added.')
            setOpenSnake(true)
          }
        })
      }
    }
  };

  const handleSubmit = () => {
    if (editLevel === undefined) {
      createStrategy();
    } else {
      editStrategy();
    }
  };

  const handleAddRequirement = () => {
    if (req !== '') {
      if(requirements.find(r => r===req) === undefined) {
        setRequirements(prevState => [...prevState, req])
        setReq('')
      }
    }
  };

  const handleRemoveReq = (ix) => {
    const newReq = requirements.filter((r, index) => index !== ix)
    setRequirements(newReq)
  };

  const renderRequirementList = () => {
    if (requirements.length > 0) {
      return(
        <List>
          {
            requirements.map((r, index) => {
              return(
                <ListItem key={index} disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <CancelIcon color="error" onClick={() => handleRemoveReq(index)}/>
                    </ListItemIcon>
                    <ListItemText primary={r} />
                  </ListItemButton>
                </ListItem>
              )
            })
          }

        </List>
      )
    } else {
      return <EmptyContent />
    }

  };

  const renderDetails = (
    <>
      {mdUp && (
        <>
          <Grid md={4}>
            <Stack spacing={3} sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 0.5 }}>
                Goal
              </Typography>

              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Represents a desired outcome that stakeholders aim to achieve,
                such as increasing customer satisfaction or improving profitability.
                It is part of the motivation layer, which helps to clarify the reasons behind changes in enterprise architecture.
              </Typography>

              <Typography variant="h6" sx={{ mb: 0.5, mt: '20px' }}>
                Requirement
              </Typography>

              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                The necessary conditions that must be met to achieve a goal within an enterprise architecture.
                It ensures that the solutions developed align with the stakeholders' needs and the overall objectives of the organization.
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
            <CustomTextField disabled={disabled} label="Level" value={level} onChange={(v) => setLevel(v)} error={levelError} helperText={levelErrorMsg}/>

            <CustomTextField disabled={disabled} label="Goal" value={goal} onChange={(v) => setGoal(v)} error={goalError} helperText={'Goal is required'}/>

            <Stack direction="row" spacing={2}>
              <CustomTextField label="Requirement" multiline rows={2} value={req} onChange={(v) => setReq(v)} error={reqError} helperText={'*Requirement is Required'}/>
              <Button variant="text" onClick={handleAddRequirement}>Add</Button>
            </Stack>
            {
              renderRequirementList()
            }
            <Divider />

            <Stack
              direction="row"
              spacing={2}
              sx={{
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              {strategyError !== '' &&
               <Typography variant="body2" sx={{ color: 'red' }}>
                 {strategyError}
               </Typography>
              }

              {error !== '' &&
               <Typography variant="body2" sx={{ color: 'red' }}>
                 {error}
               </Typography>
              }

              <LoadingButton variant="contained" size="large" loading={strategyLoading} onClick={handleSubmit}>
                {btnTitle}
              </LoadingButton>
            </Stack>

          </Stack>



        </Card>
      </Grid>
    </>
  );



  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <PageTitle title={title} />

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

