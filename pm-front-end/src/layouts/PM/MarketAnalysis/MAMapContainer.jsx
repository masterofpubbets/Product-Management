import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';


import CustomBreadcrumbs from "src/components/custom-breadcrumbs";
import { useSettingsContext } from "src/components/settings";

const headers = ['Company', 'Mission', 'Pricing', 'Top Feature', 'Strength', 'Weakness', 'Differentiation', 'Market Target', 'Market Share', 'User Review'];
const spacing = 0;

export default function MAMapContainer({comps}) {
  const settings = useSettingsContext();

  const Item = styled(Paper)(({ theme, bglight, bgdark }) => ({
    backgroundColor: bglight,
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: settings.themeMode === 'light' ? 'black' : 'white',
    ...theme.applyStyles('dark', {
      backgroundColor: bgdark,
    }),
  }));


  const renderHeader = () => {
    const wdth = 100 / headers.length
    return (
      <Box sx={{ flexGrow: 1, marginBottom: '25px' }}>

        <Grid container spacing={spacing}>

          {
            headers.map((h, index) => {
              let bglight = index === 0 && '#a3b18a' || index % 2 !== 0 && '#dda15e' || '#fefae0'
              let bgdark = index === 0 && '#582f0e' || index % 2 !== 0 && '#bc6c25' || '#283618'
              return(
                <Grid key={index} sx={{ width: `${wdth}%` }}>
                  <Item bglight={bglight} bgdark={bgdark}>{h}</Item>
                </Grid>
              )
            })
          }

        </Grid>

      </Box>
    )
  };

  const renderDataRow = (company, index) => {
    const wdth = 100 / headers.length
    const row = comps[0].filter(c => c.com === company)
    let section = ''
    return (
      <Box key={index} sx={{ flexGrow: 1, marginBottom: '25px' }}>
        <Grid container spacing={spacing}>
          {
            <Grid sx={{width: `${wdth}%`}}>
              <Item bglight={'#a3b18a'} bgdark={'#582f0e'}>{company}</Item>
            </Grid>
          }

          {
            headers.map((h, index) => {
              let bglight = index === 0 && '#a3b18a' || index % 2 !== 0 && '#dda15e' || '#fefae0'
              let bgdark = index === 0 && '#582f0e' || index % 2 !== 0 && '#bc6c25' || '#283618'
              section = row.find(r => r.det_type === h)
              if (section !== undefined) {
                return(
                  <Grid key={index} sx={{width: `${wdth}%`}}>
                    <Item bglight={bglight} bgdark={bgdark}>{section.det}</Item>
                  </Grid>

                )
              }

            })
          }

        </Grid>
      </Box>
    )


  };

  const renderData = () => {
    let companies = []
    comps[0].forEach(c => {
        if (companies.find(i => i === c.com) === undefined) {
          companies.push(c.com)
        }
      })

    return companies.map((c, index) => {
        return renderDataRow(c, index)
      })

  };

  return(
    <>
      <CustomBreadcrumbs
        heading="Competition Map"
        sx={{ mb: { xs: 3, md: 5 }, mt: { xs: 5, md: 5, lg: 5 } }}
        links={[{ name: '', href: '' }]}
      />

      {renderHeader()}
      {renderData()}

    </>
  )
};
