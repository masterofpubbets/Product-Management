import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CardMedia from '@mui/material/CardMedia';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Snackbar from '@mui/material/Snackbar';
import Button from '@mui/material/Button';
// hooks
import { useResponsive } from 'src/hooks/use-responsive';
import { useOkr } from 'src/hooks/useOkr';
// components
import { useSettingsContext } from 'src/components/settings';
import okrIcon from 'src/assets/illustrations/ic_okr.svg';
import PageTitle from 'src/components/PageTitle/PageTitle';
import CustomTextField from 'src/components/Texts/CustomTextField';
import FullScreenDialog from 'src/components/Dialogs/FullScreenDialog';
// ----------------------------------------------------------------------

export default function NewObj() {
  const { id } = useParams();
  const { objectives, okrError, okrLoading, addNewObj, editObj } = useOkr();
  const settings = useSettingsContext();
  const mdUp = useResponsive('up', 'md');
  const [name, setName] = useState(
    id === undefined ? '' : objectives.details.find((i) => Number(i.id) === Number(id)).name);
  const [nameError, setNameError] = useState(false);
  const [order, setOrder] = useState(
    id === undefined ? 0 : objectives.details.find((i) => Number(i.id) === Number(id)).order_nunmber
  );
  const [orderError, setOrderError] = useState(false);
  const [orderErrorMsg, setOrderErrorMsg] = useState('');
  const [group, setGroup] = useState(
    id === undefined
      ? 'Undefined'
      : objectives.details.find((i) => Number(i.id) === Number(id)).group_name
  );
  const [groupError, setGroupError] = useState(false);
  const [btnLabel] = useState(id === undefined ? 'Create Objective' : 'Update Objective');
  const [pgLabel] = useState(id === undefined ? 'New Objective' : 'Update Objective');
  const [groupList, setGroupList] = useState(['Undefined']);
  const [openSnake, setOpenSnake] = useState(false);
  const [snakeMessage, setSnakeMessage] = useState('Objective has been added.');
  const [openDialog, setOpenDialog] = useState(false);
  const [addGroupError, setAddGroupError] = useState(false);
  const [addGroupErrorMsg, setAddGroupErrorMsg] = useState('');
  const [addGroupValue, setAddGroupValue] = useState('');


  useEffect(() => {
    if(objectives.details.length > 0){
      let tempList = ['Undefined'];
      objectives.details.forEach((i) => {
        if (tempList.find((l) => l === i.group_name) === undefined) {
          tempList.push(i.group_name);
        }
      })
      setGroupList(tempList);
    }

  }, [objectives.version])

  const handleAddGroup = () => {
    if(addGroupValue === '') {
      setAddGroupErrorMsg('Group name is required');
      setAddGroupError(true);
    } else {
      if (groupList.find((i) => i === addGroupValue) === undefined) {
        let tempGroup = groupList;
        tempGroup.push(addGroupValue);
        setGroupList(tempGroup);
        setGroup(addGroupValue);
        setOpenDialog(false);
        setAddGroupValue('');
        setAddGroupError(false);
      } else {
        setAddGroupErrorMsg('Group name already exists');
        setAddGroupError(true);
      }

    }
  };

  const handleOpenAddGroupDialog = () => {
    setAddGroupErrorMsg('');
    setAddGroupError(false);
    setAddGroupValue('')
    setOpenDialog(true);
  };

  const resetFieldsError = () => {
    setNameError(false);
  };


  const resetFieldsTexts = () => {
    setName('');
    setOrder(0);
    setGroup('');
  };

  const isNumeric = (str) => {
    return Number.isFinite(+str);
  };

  const checkData = () => {
    resetFieldsError();

    if (name === '') {
      setNameError(true);
      return false;
    }

    if (order === '') {
      setOrderErrorMsg('Order is required');
      setOrderError(true);
      return false;
    }

    if (!isNumeric(order)) {
      setOrderErrorMsg('Order must be a number');
      setOrderError(true);
      return false;
    }

    if (group === '') {
      setGroupError(true);
      return false;
    }

    return true;
  };

  const handleSubmit = () => {
    if (checkData()) {
      const obj = {
        id,
        name,
        group,
        order,
      };
      if (id === undefined) {
        addNewObj(obj).then((result) => {
          if (result) {
            resetFieldsTexts();
            setOpenSnake(true);
          }
        });
      } else {
        editObj(obj).then((result) => {
          if (result) {
            setSnakeMessage('Objective has been updated');
            setOpenSnake(true);
          }
        });
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
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}
        >
          {okrError !== '' && (
            <Typography variant="body2" sx={{ color: 'red' }}>
              {okrError}
            </Typography>
          )}

          <LoadingButton
            variant="contained"
            size="large"
            loading={okrLoading}
            onClick={handleSubmit}
          >
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
                Objective
              </Typography>

              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                A qualitative statement that defines a compelling, time‑bound goal. It should be
                inspirational, actionable, and easily understood by the whole team.
              </Typography>

              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Define the Objective Keep it short (one sentence). Make it ambitious but realistic.
              </Typography>

              <CardMedia
                component="img"
                alt="product"
                height="350"
                image={okrIcon}
                sx={{ alignSelf: 'center', objectFit: 'contain', width: '100%' }}
              />
            </Stack>
          </Grid>
        </>
      )}

      <Grid xs={12} md={8}>
        <Card>
          {!mdUp && <CardHeader title="Details" />}

          <Stack spacing={3} sx={{ p: 3 }}>

              <CustomTextField
                label="Objective"
                value={name}
                onChange={(v) => setName(v)}
                error={nameError}
                helperText={'*Name is Required'}
              />

            <CustomTextField
              label="Order"
              multiline
              value={order}
              onChange={(v) => setOrder(v)}
              error={orderError}
              helperText={orderErrorMsg}
            />

            <Stack spacing={1}>
              <FormControl>
                <InputLabel id="demo-simple-select-helper-label" sx={{ width: '100%' }}>
                  Group
                </InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={group}
                  label="Group"
                  onChange={(e) => setGroup(e.target.value)}
                  sx={{ width: '100%' }}
                >
                  {groupList.map((g, index) => (
                    <MenuItem key={index} value={g}>{g}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button variant="contained" color={'warning'} onClick={handleOpenAddGroupDialog}>
                Add Group
              </Button>
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

      <FullScreenDialog
        show={openDialog}
        onClose={() => setOpenDialog(false)}
        title={'Create Group'}
      >
        <Stack
          direction="column"
          spacing={1}
          sx={{
            width: '50%',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            marginTop: '20px',
          }}
        >
          <CustomTextField
            label="Group"
            multiline
            value={addGroupValue}
            onChange={(v) => setAddGroupValue(v)}
            error={addGroupError}
            helperText={addGroupErrorMsg}
          />
          <Button variant="contained" onClick={handleAddGroup}>
            Add
          </Button>
        </Stack>
      </FullScreenDialog>
    </>
  );
}
