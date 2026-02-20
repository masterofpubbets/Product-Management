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
import flagIcon from 'src/assets/illustrations/ic_flag.svg';
import PageTitle from 'src/components/PageTitle/PageTitle';
import CustomTextField from 'src/components/Texts/CustomTextField';
import FullScreenDialog from 'src/components/Dialogs/FullScreenDialog';
import SimpleTable from 'src/components/SimpleTable/SimpleTable';
import SimpleDialog from 'src/sections/_examples/mui/dialog-view/simple-dialog';
// ----------------------------------------------------------------------


const currentKeyResultcolumns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'name',
    headerName: 'Key Result',
    width: 450,
    editable: false,
  },
  {
    field: 'status_name',
    headerName: 'Status',
    width: 150,
    editable: false,
  },
  {
    field: 'weight',
    headerName: 'Weight',
    type: 'number',
    width: 110,
    editable: false,
  },
];

const currentKeyResultRows = [
  { id: 1, name: 'Jon', weight: 14 },
  { id: 2, name: 'Cersei', weight: 31 },
];

export default function NewKeyResult() {
  const { objId, id } = useParams();
  const { keyResults, keyStatus, okrError, okrLoading, getKeyStatus, addNewKeyResult } = useOkr();
  const [currentKeyResult, setCurrentKeyResult] = useState([]);
  const [totalWeight, setTotalWeight] = useState(0);
  const settings = useSettingsContext();
  const mdUp = useResponsive('up', 'md');
  const [name, setName] = useState(
    id === undefined ? '' : keyResults.details.find((i) => Number(i.id) === Number(id)).name
  );
  const [nameError, setNameError] = useState(false);
  const [weight, setWeight] = useState(
    id === undefined ? 0 : keyResults.details.find((i) => Number(i.id) === Number(id)).weight
  );
  const [weightError, setWeightError] = useState(false);
  const [weightErrorMsg, setWeightErrorMsg] = useState('');
  const [status, setStatus] = useState(
    id === undefined
      ? 'Undefined'
      : keyResults.details.find((i) => Number(i.id) === Number(id)).status_name
  );
  const [statusError, setStatusError] = useState(false);
  const [btnLabel] = useState(id === undefined ? 'Create Key Result' : 'Update Key Result');
  const [pgLabel] = useState(id === undefined ? 'New Key Result' : 'Update Key Result');
  const [statusList, setStatusList] = useState(['Undefined']);
  const [openSnake, setOpenSnake] = useState(false);
  const [snakeMessage, setSnakeMessage] = useState('Key Result has been added.');
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    getKeyStatus().then(

    );
  }, []);

  useEffect(() => {
    if (keyStatus.details.length > 0) {
      let tempStatus = [];
      keyStatus.details.forEach((i) => {
        tempStatus.push(i.name);
      });
      setStatusList(tempStatus);
    }
  }, [keyStatus.version]);

  useEffect(() => {
    if(keyStatus.details.length > 0) {
      let total = 0
      const current = keyResults.details.filter(i => Number(i.obj_id) === Number(objId))
      current.forEach(i => {
        total += i.weight;
      });
      setCurrentKeyResult(current);
      setTotalWeight(total);
    }

  }, [keyResults.version]);


  const resetFieldsError = () => {
    setNameError(false);
  };

  const resetFieldsTexts = () => {
    setName('');
    setWeight(0);
    setStatus('');
  };

  const isNumeric = (str) => {
    return Number.isFinite(+str);
  };

  const checkWeight = (w) => {
    return Number(w) + totalWeight <= 100;
  };

  const checkData = () => {
    resetFieldsError();

    if (name === '') {
      setNameError(true);
      return false;
    }

    if (weight === '') {
      setWeightErrorMsg('Weight is required');
      setWeightError(true);
      return false;
    }

    if (!isNumeric(weight)) {
      setWeightErrorMsg('Weight must be a number');
      setWeightError(true);
      return false;
    }

    if ((Number(weight) > 100) || (Number(weight) < 0)) {
      setWeightErrorMsg('Weight must be in a range 0 to 100');
      setWeightError(true);
      return false;
    }

    if(checkWeight(weight) === false) {
      setWeightErrorMsg('Total Weight more than 100');
      setWeightError(true);
      return false;
    }

    if (status === '') {
      setStatusError(true);
      return false;
    }

    return true;
  };

  const handleSubmit = () => {
    if (checkData()) {
      const obj = {
        id,
        name,
        objId,
        weight,
        kpi: status,
      };
      if (id === undefined) {
        addNewKeyResult(obj).then((result) => {
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
                Key Result
              </Typography>

              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Is a concrete, measurable goal that tells you whether an Objective is on track.
              </Typography>

              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Measurable outcome: A KR is a specific, quantifiable metric (e.g., “increase monthly
                active users to 50 k”) that shows whether the objective is being achieved.
                Time‑bound target: It’s set for the same period as the Objective and usually
                expressed with a numeric goal or clear threshold. Outcome focus: KRs measure
                results, not activities—so they capture impact rather than effort (e.g., “reduce
                churn rate to 5%” vs. “run three churn‑reduction workshops”). Progress indicator:
                The degree of completion (0–100 %) reflects progress toward the Objective; a KR is
                typically considered achieved when it reaches or exceeds its target.
              </Typography>

              <CardMedia
                component="img"
                alt="product"
                height="350"
                image={flagIcon}
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
              label="Key Result"
              value={name}
              onChange={(v) => setName(v)}
              error={nameError}
              helperText={'*Name is Required'}
            />

            <Stack direction="row" spacing={1}>
              <CustomTextField
                label="Weight"
                multiline
                value={weight}
                onChange={(v) => setWeight(v)}
                error={weightError}
                helperText={weightErrorMsg}
              />
              <Button variant="contained" color={'warning'} onClick={() => setOpenDialog(true)}>
                Current
              </Button>
            </Stack>

            <FormControl>
              <InputLabel id="demo-simple-select-helper-label" sx={{ width: '100%' }}>
                Status
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={status}
                label="Status"
                onChange={(e) => setStatus(e.target.value)}
                sx={{ width: '100%' }}
              >
                {statusList.map((g, index) => (
                  <MenuItem key={index} value={g}>
                    {g}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

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
        title={`Current Key Results Total Weight: ${totalWeight}`}
      >
        <SimpleTable columns={currentKeyResultcolumns} rows={currentKeyResult} />
      </FullScreenDialog>
    </>
  );
}
