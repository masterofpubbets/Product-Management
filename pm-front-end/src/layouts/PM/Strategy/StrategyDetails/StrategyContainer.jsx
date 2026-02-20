import Stack from '@mui/material/Stack';
import StrategyGoal from "src/layouts/PM/Strategy/StrategyDetails/StrategyGoal";


export default function StrategyContainer({data}) {

  const renderDetails = () => {
    return data.map((i) => {
      return (
        <StrategyGoal key={i.id} id={i.id} goals={i} level={i.level} />
      )
    })
  };

  return (
      <Stack spacing={3} >
        {renderDetails()}
      </Stack>
  )
};
