import { useState } from 'react';
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
import CardMedia from '@mui/material/CardMedia';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Switch from '@mui/material/Switch';
import Snackbar from '@mui/material/Snackbar';
import Button from '@mui/material/Button';
// hooks
import { useResponsive } from 'src/hooks/use-responsive';
import { useOkr } from 'src/hooks/useOkr';
// components
import { useSettingsContext } from 'src/components/settings';
import PageTitle from 'src/components/PageTitle/PageTitle';
import CustomTextField from 'src/components/Texts/CustomTextField';
// ----------------------------------------------------------------------

export default function NewStatus() {
  const { id } = useParams();
  const { keyStatus, okrError, okrLoading, addStatus, editStatus } = useOkr();
  const settings = useSettingsContext();
  const mdUp = useResponsive('up', 'md');
  const [name, setName] = useState(
    id === undefined ? '' : keyStatus.details.find((i) => Number(i.id) === Number(id)).name
  );
  const [nameError, setNameError] = useState(false);
  const [point, setPoint] = useState(
    id === undefined ? 0 : keyStatus.details.find((i) => Number(i.id) === Number(id)).point
  );
  const [pointError, setPointError] = useState(false);
  const [pointErrorMsg, setPointErrorMsg] = useState('Point is required');
  const [order, setOrder] = useState(
    id === undefined ? 0 : keyStatus.details.find((i) => Number(i.id) === Number(id)).order
  );
  const [orderError, setOrderError] = useState(false);
  const [orderErrorMsg, setOrderErrorMsg] = useState('Order is required');
  const [btnLabel] = useState(id === undefined ? 'Create Status' : 'Update Status');
  const [pgLabel] = useState(id === undefined ? 'New Status' : 'Update Status');

  const [openSnake, setOpenSnake] = useState(false);
  const [snakeMessage, setSnakeMessage] = useState('Status has been added.');
  const [openDialog, setOpenDialog] = useState(false);

  const resetFieldsError = () => {
    setNameError(false);
    setOrderError(false);
    setPointError(false);
  };


  const resetFieldsTexts = () => {
    setName('');
    setPoint(0);
    setOrder(0);
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

    if (point === '') {
      setPointError(true);
      return false;
    }

    if (Number(point) > 100 || Number(point) < 0) {
      setPointErrorMsg('Point is a percentage and it has to be in a range 0 to 100');
      setPointError(true);
      return false;
    }

    if (order === '') {
      setOrderError(true);
      return false;
    }

    if (!isNumeric(point)) {
      setPointErrorMsg('Point is not a number');
      setPointError(true);
      return false;
    }

    if (!isNumeric(order)) {
      setOrderErrorMsg('Order is not a number');
      setOrderError(true);
      return false;
    }

    return true;
  };

  const handleSubmit = () => {
    if (checkData()) {
      const status = {
        id,
        name,
        point,
        order,
      };
      if (id === undefined) {
        addStatus(status).then((result) => {
          if (result) {
            resetFieldsTexts();
            setOpenSnake(true);
          }
        });
      } else {
        editStatus(status).then((result) => {
          if (result) {
            setSnakeMessage('Feature has been updated');
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
                Status
              </Typography>

              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Create status in order to assign it later to key result and give it a progress
                point.
              </Typography>

              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Point equal to progress and it should be from range 0-100 which equal to done
                percentage.
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Order is the step order example Not Started = 0, In Progress = 1, Blocked = 2, In
                Review = 3, Done = 4
              </Typography>
            </Stack>
          </Grid>
        </>
      )}

      <Grid xs={12} md={8}>
        <Card>
          {!mdUp && <CardHeader title="Details" />}

          <Stack spacing={3} sx={{ p: 3 }}>
            <CustomTextField
              label="Status Name"
              value={name}
              onChange={(v) => setName(v)}
              error={nameError}
              helperText={'*Name is Required'}
            />

            <Stack direction="row" spacing={1}>
              <CustomTextField
                label="Point"
                multiline
                rows={1}
                value={point}
                onChange={(v) => setPoint(v)}
                error={pointError}
                helperText={pointErrorMsg}
              />

              <CustomTextField
                label="Order"
                multiline
                rows={1}
                value={order}
                onChange={(v) => setOrder(v)}
                error={orderError}
                helperText={orderErrorMsg}
              />
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

    </>
  );
}
