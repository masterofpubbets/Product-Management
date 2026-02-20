import {useState, useEffect} from "react";

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
import markIcon from 'src/assets/illustrations/ic_mark.svg';
import { ConfirmDialog } from 'src/components/custom-dialog';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import {useBoolean} from "src/hooks/use-boolean";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Iconify from "src/components/iconify";
import Stack from "@mui/material/Stack";
import Feature from 'src/layouts/PM/Okr/Feature';
import { useOkr } from "src/hooks/useOkr";
import ProgressBar from 'src/components/Progress/ProgressBar';

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

export default function Initiatives({ initiatives, withSelect, onSelect, summary }) {
  const [expanded, setExpanded] = useState(false);
  const [fetData, setFetData] = useState([]);
  const { features, clearIni, deleteFt } = useOkr();
  const confirm = useBoolean();
  const popover = usePopover();

  useEffect(() => {
    setFetData(features.details.filter((f) => f.iniid === initiatives.id));
  }, [features.version]);

  const getSummary = (id) => {
    const objList = summary.filter((s) => s.itemId === id && s.itemType === 'ini');
    if (summary.length > 0) {
      return {
        totalAmount: '',
        value: Number(objList[0].progress),
        label: 'Progress %',
        color: 'success',
      };
    } else {
      return {
        totalAmount: '',
        value: 0,
        label: 'Progress %',
        color: 'success',
      };
    }
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleOnDelete = () => {
    console.log('handleOnDelete Ini', initiatives.id);
    confirm.onFalse();
  };

  const handleClickSelected = () => {
    onSelect(initiatives.id, initiatives.name);
  };

  const handleEdit = () => {
    console.log(initiatives.id);
  };

  const handleUnlinkIni = (id) => {
    clearIni(id).then(() => {});
  };

  const handleDelFet = (id) => {
    deleteFt(id).then(() => {});
  };

  const renderFeatures = () => {
    if (fetData.length > 0) {
      return fetData.map((i) => {
        return (
          <Feature
            key={i.id}
            fet={i}
            withSelect={withSelect}
            onUnlinkIni={handleUnlinkIni}
            onDelete={handleDelFet}
          />
        );
      });
    }
  };

  return (
    <>
      <Card key={initiatives.id} sx={{ width: '100%' }}>
        <CardHeader
          avatar={
            <Avatar
              alt={'O'}
              src={markIcon}
              variant="rounded"
              sx={{ width: 40, height: 40, mr: 2 }}
            ></Avatar>
          }
          action={
            <IconButton aria-label="settings" onClick={popover.onOpen}>
              <MoreVertIcon />
            </IconButton>
          }
          title={initiatives.name}
          subheader={initiatives.status}
        />
        <CardContent>
          <ProgressBar progress={getSummary(initiatives.id)} />
          <Typography variant="caption" sx={{ marginTop: 4 }}>
            {`Priority ${initiatives.priority}`}
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
            <Stack spacing={5}>{renderFeatures()}</Stack>
          </CardContent>
        </Collapse>
      </Card>

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 140 }}
      >
        <MenuItem
          onClick={() => {
            handleEdit();
            popover.onClose();
          }}
        >
          <Iconify icon="solar:pen-bold" />
          Edit
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

        {withSelect && (
          <MenuItem
            onClick={() => {
              handleClickSelected();
              popover.onClose();
            }}
          >
            <Iconify icon="ant-design:select-outlined" />
            Select
          </MenuItem>
        )}
      </CustomPopover>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete"
        content="Are you sure want to delete?"
        action={
          <Button variant="contained" color="error" onClick={handleOnDelete}>
            Delete
          </Button>
        }
      />
    </>
  );
};
