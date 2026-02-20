import {useState} from "react";

import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import flagIcon from 'src/assets/illustrations/ic_flag.svg';
import ProgressBar from "src/components/Progress/ProgressBar";
import Initiatives from "src/layouts/PM/Okr/Initiatives";
import Stack from "@mui/material/Stack";
import { ConfirmDialog } from 'src/components/custom-dialog';
import CustomPopover, { usePopover } from 'src/components/custom-popover';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
  variants: [
    {
      props: ({ expand }) => !expand,
      style: {
        transform: 'rotate(0deg)',
      },
    },
    {
      props: ({ expand }) => !!expand,
      style: {
        transform: 'rotate(180deg)',
      },
    },
  ],
}));

export default function KeyResults({keyResults, initiatives, features, withSelect, onInitiativeSelect, summary}){
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const getSummary = (id) => {
    const objList = summary.filter((s) => s.itemId === id && s.itemType === 'key');
    if (summary.length > 0) {
      return {
        totalAmount: '',
        value: Number(objList[0]?.progress === undefined ? 0 : Number(objList[0].progress)),
        label: 'Progress %',
        color: 'primary',
      };
    } else {
      return {
        totalAmount: '',
        value: 0,
        label: 'Progress %',
        color: 'primary',
      };
    }
  };


  return (
    <Card key={keyResults.id} sx={{ width: '100%' }}>
      <CardHeader
        avatar={
          <Avatar
            alt={'O'}
            src={flagIcon}
            variant="rounded"
            sx={{ width: 40, height: 40, mr: 2 }}
          ></Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={keyResults.name}
        subheader={keyResults.status_name}
      />
      <CardContent>
        <ProgressBar progress={getSummary(keyResults.id)} />
        <Typography variant="caption" sx={{ marginTop: 4 }}>
          {`Weight ${keyResults.weight}`}
        </Typography>
      </CardContent>

      <CardActions disableSpacing>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Stack spacing={5}>
            {initiatives.map((k) => {
              return (
                <Initiatives
                  key={k.id}
                  initiatives={k}
                  withSelect={withSelect}
                  onSelect={onInitiativeSelect}
                  features={features}
                  summary={summary}
                />
              );
            })}
          </Stack>
        </CardContent>
      </Collapse>
    </Card>
  );
};
