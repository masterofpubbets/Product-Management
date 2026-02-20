import {useState} from "react";
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Snackbar from '@mui/material/Snackbar';

import goalIcon from 'src/assets/illustrations/ic_goal.svg'
import goalLevel from 'src/assets/illustrations/ic_level_up.svg'
import goalRequirement from 'src/assets/illustrations/ic_requirement.svg'
import { useSettingsContext } from "src/components/settings";
import ConfirmDialog from "src/components/Dialogs/ConfirmDialog";
import{ useStrategy} from "src/hooks/useStrategy";
import {useProduct} from "src/hooks/useProducts";

export default function StrategyGoal({id, level, goals}) {
  const settings = useSettingsContext();
  const navigate = useNavigate();
  const { addStrategy } = useStrategy();
  const {selectedProduct} = useProduct();
  const bg = settings.themeMode === 'light' ? '#eae2b7' : '#7C99A2'
  const fg = settings.themeMode === 'light' ? '#2f4858' : '#2f4858'
  const [openDialog, setOpenDialog] = useState(false);
  const [newGoals, setNewGoals] = useState([])
  const [snakeMessage, setSnakeMessage] = useState('Stakeholder has been added.');
  const [openSnake, setOpenSnake] = useState(false);


  //console.log('goals',goals)
  //console.log('id', id)
  //console.log('level', level)

  const handleCloseDialog = () => {
    setOpenDialog(false)
  };
  const handleConfirmDialog = () => {
    console.log('ff')
    setOpenDialog(false)
    addStrategy(level,newGoals).then((result) => {
      if (result) {

      }
    })
  };

  const handleEditGoal = (index) => {
    if (selectedProduct.details.role === 'admin' || selectedProduct.details.role === 'owner') {
      const goal = goals.goals[index]
      navigate(`/strategy/new/${level}/${goal.goal}`)
    } else {
      setSnakeMessage('Permission Denied')
      setOpenSnake(true)
    }

  };

  const handleDeleteGoal = (ix) => {
    if (selectedProduct.details.role === 'admin' || selectedProduct.details.role === 'owner') {
      const newGoal = goals.goals.filter((g,index) => index !== ix)
      setNewGoals(newGoal)
      setOpenDialog(true)
    } else {
      setSnakeMessage('Permission Denied')
      setOpenSnake(true)
    }

  };

  const renderItems = (items) => {
    return(
      items.map((i, index) => {
        return(
          <Stack key={index} direction="row" spacing={2}>
            <Avatar alt="Remy Sharp" src={goalRequirement} sx={{ width: 20, height: 21 }}/>
            <Typography key={index}>{i}</Typography>
          </Stack>
        )
      })
    )
  };

  const renderGoal = (index, goalName, items) => {
    return(
      <Card key={index}
            sx={{
              minWidth: '250px',
              backgroundColor: bg,
              color: fg
      }}>

        <CardContent>
          <Stack direction="row" spacing={2}>
            <Avatar alt="Remy Sharp" src={goalIcon} sx={{ width: 30, height: 30 }}/>
            <Typography gutterBottom variant="h5" component="div">
              {goalName}
            </Typography>
          </Stack>

          {renderItems(items)}

        </CardContent>

        <CardActions>
          <IconButton aria-label="delete" size="small" color="primary" onClick={() => handleDeleteGoal(index)}>
            <DeleteIcon fontSize="inherit" />
          </IconButton>
          <IconButton aria-label="edit" size="small" color="primary" onClick={() => handleEditGoal(index)}>
            <EditIcon fontSize="inherit" />
          </IconButton>
        </CardActions>

      </Card>
    )
  }

  const renderGoals = () => {
    return (
      <Stack direction="row" spacing={2}>
        {
          goals && goals.goals.map((g, index) => {
            return (
              renderGoal(index, g.goal, g.items)
            )
          })
        }
      </Stack>
    )
  };

  return (
    <>

      <Card sx={{ width: '100%' }}>
        <CardContent>
          <Stack
            direction="row"
            spacing={2}
            sx={{
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Stack direction="row" spacing={2}>
              <Avatar alt="Remy Sharp" src={goalLevel} sx={{ width: 30, height: 30 }}/>
              <Typography gutterBottom variant="h5" component="div">
                {`Level ${level}`}
              </Typography>
            </Stack>
          </Stack>
          {renderGoals()}

        </CardContent>

      </Card>

      <ConfirmDialog
        title={"Confirm Deletion"}
        content={"Do you want to delete this goal?"}
        open={openDialog}
        onCancel={handleCloseDialog}
        OnConfirm={handleConfirmDialog}
      />

      <Snackbar
        open={openSnake}
        autoHideDuration={2000}
        onClose={() => setOpenSnake(false)}
        message={snakeMessage}
      />

    </>
  );
};



