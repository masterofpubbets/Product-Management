// @mui
import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

// _mock
import { _appFeatured, _appAuthors, _appInstalled, _appRelated, _appInvoices, _subconPerformance, _disciplineProgress } from 'src/_mock';
// components
import { useSettingsContext } from 'src/components/settings';
//
import SubConPerformance from '../app-subcon-performance';
import DisciplineProgress from '../app-discipline-progress';
import AppAreaInstalled from '../app-area-installed';
import AppWidgetSummary from '../app-widget-summary';
import AppCurrentDownload from '../app-current-download';

// ----------------------------------------------------------------------

export default function OverviewAppView() {
  const theme = useTheme();

  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Grid container spacing={3}>

        <Grid xs={12} md={12} lg={12}>
          <Typography variant="h4" gutterBottom color="primary">
            Cutoff Date: 01/03/2026
          </Typography>
        </Grid>

        <Grid xs={12} md={4}>
          <AppWidgetSummary
            title="Total Manhours"
            percent={2.6}
            total={475056}
            chart={{
              series: [30929, 231435, 310432, 232335, 253817, 276921, 303807, 329672, 385737, 475056],
            }}
          />
        </Grid>

        <Grid xs={12} md={4}>
          <AppWidgetSummary
            title="Total Progress"
            percent={0.2}
            total={2.2}
            chart={{
              colors: [theme.palette.info.light, theme.palette.info.main],
              series: [1.8, 1.8, 1.9, 1.9, 2, 2.2],
            }}
          />
        </Grid>

        <Grid xs={12} md={4}>
          <AppWidgetSummary
            title="Total Weeks"
            percent={-0.1}
            total={96}
            chart={{
              colors: [theme.palette.warning.light, theme.palette.warning.main],
              series: [],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppCurrentDownload
            title="Manpower Load"
            chart={{
              series: [
                { label: 'Building', value: 555400 },
                { label: 'Civil', value: 3035968 },
                { label: 'Electrical', value: 2086638 },
                { label: 'Fireproofing', value: 299513 },
                { label: 'Instrumentation', value: 1651250 },
                { label: 'Insulation', value: 1272304 },
                { label: 'Mechanical', value: 4483913 },
                { label: 'Painting', value: 128625 },
                { label: 'Piling', value: 623776 },
                { label: 'Piping', value: 5879047 },
                { label: 'Structure', value: 1138449 },
                { label: 'Precom', value: 2068741 },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppAreaInstalled
            title="Progress Curve"
            subheader="(+43%) than last year"
            chart={{
              categories: [
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec',
              ],
              series: [
                {
                  year: '2025',
                  data: [
                    {
                      name: 'Actual',
                      data: [0,0,0.12,0.44,0.78,1.26,5,8,14,18,26,30],
                    },
                    {
                      name: 'Plan',
                      data: [0.02,0.34,0.68,1.16,1.32,5.6,7.2,10.12,15.2,22.1,27.6,33.6],
                    },
                  ],
                },
                {
                  year: '2026',
                  data: [
                    {
                      name: 'Actual',
                      data: [33,42,47,0,0,0,0,0,0,0,0,0],
                    },
                    {
                      name: 'Plan',
                      data: [38.32,42,47,51,55,58,62,66,68,69,70,72],
                    },
                  ],
                },
                {
                  year: '2027',
                  data: [
                    {
                      name: 'Actual',
                      data: [0,0,0,0,0,0,0,0,0,0,0,0],
                    },
                    {
                      name: 'Plan',
                      data: [74,76,79,82,85,88,91,92,94,95,98,100],
                    },
                  ],
                },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} lg={8}>
          <SubConPerformance
            title="Subcontractor Performance"
            tableData={_subconPerformance}
            tableLabels={[
              { id: 'Subcontractor', label: 'Subcontractor' },
              { id: 'Manpower', label: 'Manpower' },
              { id: 'Plan', label: 'Plan' },
              { id: 'Actual', label: 'Actual' },
              { id: '' },
            ]}
            showButton={false}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <DisciplineProgress
            title="Disciplines Progress"
            tableData={_disciplineProgress}
            tableLabels={[
              { id: 'Subcontractor', label: 'Subcontractor' },
              { id: 'Plan', label: 'Plan' },
              { id: 'Actual', label: 'Actual' },
              { id: '' },
            ]}
            showButton={false}
          />
        </Grid>

        <Grid xs={12} lg={8}>
          <SubConPerformance
            title="Discipline Summary"
            tableData={_subconPerformance}
            tableLabels={[
              { id: 'Subcontractor', label: 'Subcontractor' },
              { id: 'Manpower', label: 'Manpower' },
              { id: 'Plan', label: 'Plan' },
              { id: 'Actual', label: 'Actual' },
              { id: '' },
            ]}
            showButton={false}
          />
        </Grid>

      </Grid>
    </Container>
  );
}
