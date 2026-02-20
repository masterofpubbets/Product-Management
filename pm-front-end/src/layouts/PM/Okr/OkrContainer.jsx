import {useState} from "react";
//MUI
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
//Comps
import okrIcon from 'src/assets/illustrations/ic_okr.svg';
import flagIcon from 'src/assets/illustrations/ic_flag.svg';
import markIcon from 'src/assets/illustrations/ic_mark.svg';
import featureIcon from 'src/assets/illustrations/feature_analysis.svg';
import Objective from "src/layouts/PM/Okr/Objective";

export default function OkrContainer({
  objectives,
  keyResults,
  initiatives,
  features,
  withSelect,
  onInitiativeSelect,
  summary,
  onDeleteObj,
  onEditObj,
  onAddKeyResult,
}) {
  const [orgChart, setOrgChart] = useState(false);

  const renderDefaultView = () => {
    return objectives.map((o) => {
      return (
        <Objective
          key={o.id}
          objective={o}
          keyResults={keyResults.filter((k) => k.obj_id === o.id)}
          initiatives={initiatives}
          withSelect={withSelect}
          onInitiativeSelect={onInitiativeSelect}
          features={features}
          summary={summary}
          onDeleteRow={onDeleteObj}
          onEditRow={onEditObj}
          onAddKeyResult={onAddKeyResult}
        />
      );
    });
  };

  const renderChartView = () => {
    return <h5>renderChartView</h5>;
  };

  return (
    <>
      <Stack
        direction={{ xs: 'column', sm: 'row', lg: 'row' }}
        spacing={{ xs: 0, sm: 0, md: 3, lg: 6 }}
        sx={{
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Stack spacing={2} direction="row" sx={{ marginBottom: '10px' }}>
          <Button
            variant={orgChart ? 'text' : 'contained'}
            onClick={() => setOrgChart(false)}
            color={'warning'}
          >
            Default
          </Button>
          <Button
            variant={!orgChart ? 'text' : 'contained'}
            onClick={() => setOrgChart(true)}
            color={'warning'}
          >
            Chart
          </Button>
        </Stack>

        <Stack spacing={5} direction="row" sx={{ marginBottom: '10px' }}>
          <Stack
            direction="row"
            sx={{ marginBottom: '10px', justifyContent: 'center', alignItems: 'center' }}
          >
            <Avatar
              alt={'O'}
              src={okrIcon}
              variant="rounded"
              sx={{ width: 40, height: 40, mr: 2 }}
            ></Avatar>
            <Typography variant="caption">Objective</Typography>
          </Stack>

          <Stack
            direction="row"
            sx={{ marginBottom: '10px', justifyContent: 'center', alignItems: 'center' }}
          >
            <Avatar
              alt={'O'}
              src={flagIcon}
              variant="rounded"
              sx={{ width: 40, height: 40, mr: 2 }}
            ></Avatar>
            <Typography variant="caption">Key Result</Typography>
          </Stack>

          <Stack
            direction="row"
            sx={{ marginBottom: '10px', justifyContent: 'center', alignItems: 'center' }}
          >
            <Avatar
              alt={'O'}
              src={markIcon}
              variant="rounded"
              sx={{ width: 40, height: 40, mr: 2 }}
            ></Avatar>
            <Typography variant="caption">Initiative</Typography>
          </Stack>

          <Stack
            direction="row"
            sx={{ marginBottom: '10px', justifyContent: 'center', alignItems: 'center' }}
          >
            <Avatar
              alt={'O'}
              src={featureIcon}
              variant="rounded"
              sx={{ width: 40, height: 40, mr: 2 }}
            ></Avatar>
            <Typography variant="caption">Feature</Typography>
          </Stack>
        </Stack>
      </Stack>

      {orgChart && renderChartView()}

      <Stack spacing={5}>{!orgChart && renderDefaultView()}</Stack>
    </>
  );
};
