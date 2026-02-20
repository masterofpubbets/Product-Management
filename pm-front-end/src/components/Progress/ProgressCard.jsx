// @mui
import Stack from '@mui/material/Stack';
import CardHeader from '@mui/material/CardHeader';
import Card from '@mui/material/Card';
import ProgressBar from "src/components/Progress/ProgressBar";


// ----------------------------------------------------------------------

export default function ProgressCard({ title, subheader, data, ...other }) {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Stack spacing={4} sx={{ px: 3, pt: 3, pb: 5 }}>
        {data.map((progress) => (
          <ProgressBar key={progress.label} progress={progress} />
        ))}
      </Stack>
    </Card>
  );
}
