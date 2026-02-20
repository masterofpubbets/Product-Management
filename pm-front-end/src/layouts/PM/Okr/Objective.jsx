import {useState} from "react";

import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import okrIcon from 'src/assets/illustrations/ic_okr.svg';
import Stack from '@mui/material/Stack';
import ProgressBar from 'src/components/Progress/ProgressBar';
import KeyResults from "src/layouts/PM/Okr/KeyResults";
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { useBoolean } from 'src/hooks/use-boolean';
import MenuItem from '@mui/material/MenuItem';
import Iconify from 'src/components/iconify';
import Button from '@mui/material/Button';
import flagIcon from 'src/assets/illustrations/ic_flag.svg';

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

export default function Objective({
  objective,
  keyResults,
  initiatives,
  features,
  withSelect,
  onInitiativeSelect,
  summary,
  onDeleteRow,
  onEditRow,
  onAddKeyResult,
}) {
  const [expanded, setExpanded] = useState(false);
  const confirm = useBoolean();
  const popover = usePopover();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const getSummary = (id) => {
    const objList = summary.filter((s) => s.itemId === id && s.itemType === 'Obj');
    if (summary.length > 0) {
      return {
        totalAmount: '',
        value: Number(objList[0]?.progress),
        label: 'Progress %',
        color: 'error',
      };
    } else {
      return {
        totalAmount: '',
        value: 0,
        label: 'Progress %',
        color: 'error',
      };
    }
  };

  return (
    <>
      <Card key={objective.id} sx={{ width: '100%' }}>
        <CardHeader
          avatar={
            <Avatar
              alt={'O'}
              src={okrIcon}
              variant="rounded"
              sx={{ width: 40, height: 40, mr: 2 }}
            ></Avatar>
          }
          action={
            <IconButton aria-label="settings" onClick={popover.onOpen}>
              <MoreVertIcon />
            </IconButton>
          }
          title={objective.name}
          subheader={objective.group_name}
        />
        <CardContent>
          <ProgressBar progress={getSummary(objective.id)} />
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
              {keyResults.map((k) => {
                return (
                  <KeyResults
                    key={k.id}
                    keyResults={k}
                    initiatives={initiatives.filter((i) => i.key_id === k.id)}
                    withSelect={withSelect}
                    onInitiativeSelect={onInitiativeSelect}
                    features={features}
                    summary={summary}
                  />
                );
              })}
            </Stack>
          </CardContent>
        </Collapse>
      </Card>

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 180 }}
      >
        <MenuItem
          onClick={() => {
            onEditRow(objective.id);
            popover.onClose();
          }}
        >
          <Iconify icon="solar:pen-bold" />
          Edit
        </MenuItem>

        <MenuItem
          onClick={() => {
            onAddKeyResult(objective.id);
            popover.onClose();
          }}
        >
          <Avatar
            alt={'O'}
            src={flagIcon}
            variant="rounded"
            sx={{ width: 20, height: 20, mr: 2 }}
          ></Avatar>
          Add Key Result
        </MenuItem>

        <MenuItem
          onClick={() => {
            confirm.onTrue();
            popover.onClose();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="solar:trash-bin-trash-bold" />
          Delete
        </MenuItem>
      </CustomPopover>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete"
        content="Are you sure want to delete?"
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              onDeleteRow(objective.id);
              confirm.setValue(false);
            }}
          >
            Delete
          </Button>
        }
      />
    </>
  );
};
