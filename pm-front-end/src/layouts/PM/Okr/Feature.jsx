import {useState} from "react";

import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import featureIcon from 'src/assets/illustrations/feature_analysis.svg';
import { ConfirmDialog } from 'src/components/custom-dialog';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import {useBoolean} from "src/hooks/use-boolean";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Iconify from "src/components/iconify";


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

export default function Feature({ fet, withSelect, onUnlinkIni, onDelete }) {
  const [expanded, setExpanded] = useState(false);
  const confirm = useBoolean();
  const popover = usePopover();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleOnDelete = () => {
    onDelete(fet.id);
    confirm.onFalse();
  };

  const handleClickSelected = () => {
    //onSelect(fet.id, fet.name)
  };

  const handleEdit = () => {
    onUnlinkIni(fet.id);
  };

  return (
    <>
      <Card key={fet.id} sx={{ width: '100%' }}>
        <CardHeader
          avatar={
            <Avatar
              alt={'O'}
              src={featureIcon}
              variant="rounded"
              sx={{ width: 40, height: 40, mr: 2 }}
            ></Avatar>
          }
          action={
            withSelect === undefined && (
              <IconButton aria-label="settings" onClick={popover.onOpen}>
                <MoreVertIcon />
              </IconButton>
            )
          }
          title={fet.name}
          subheader={fet.des}
        />
        <CardContent>
          <Stack spacing={1}>
            <Typography variant="caption" sx={{ marginTop: 4 }}>
              {`Kano: ${fet.kano} | Moscow: ${fet.moscow}`}
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{ marginTop: 4 }}
              color={fet.current ? 'primary' : 'error'}
            >
              {`Is Developed: ${fet.current ? 'Yes' : 'No'}`}
            </Typography>
            {
              fet.discon &&
              <Typography
                variant="subtitle2"
                sx={{ marginTop: 4 }}
                color={'error'}
              >
                {`Is Discontinue: Yes`}
              </Typography>
            }
          </Stack>
        </CardContent>
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
          <Iconify icon="flat-color-icons:broken-link" />
          Unlink
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
          <Button variant="contained" color="error" onClick={handleOnDelete}>
            Delete
          </Button>
        }
      />
    </>
  );
};
