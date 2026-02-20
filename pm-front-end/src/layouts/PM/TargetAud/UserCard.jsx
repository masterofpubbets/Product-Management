// @mui
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
// utils
import { fShortenNumber } from 'src/utils/format-number';
// assets
import { AvatarShape } from 'src/assets/illustrations';
// components
import Iconify from 'src/components/iconify';
import userIcon1 from 'src/assets/illustrations/ic_user.svg';
import userIcon2 from 'src/assets/illustrations/ic_user2.svg';
import { ConfirmDialog } from 'src/components/custom-dialog';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import { useBoolean } from 'src/hooks/use-boolean';
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";

// ----------------------------------------------------------------------

export default function UserCard({ user, onDelete, onEdit }) {
  const { id, role, age, education, location, problem, gender, interests, bahavioral, life_style, goal } = user;
  const confirm = useBoolean();
  const popover = usePopover();

  const onDeleteRow = () => {
    onDelete(id);
  };

  const onEditRow = () => {
    onEdit(id)
  };

  return (
    <Card sx={{ textAlign: 'center' }}>
      <Stack
        direction="row"
        spacing={2}
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ position: 'relative' }}>
          <AvatarShape
            sx={{
              left: 10,
              right: 0,
              zIndex: 10,
              mx: 'auto',
              bottom: -26,
              position: 'absolute',
            }}
          />

          <Avatar
            alt={name}
            src={gender === 'Male' ? userIcon1 : userIcon2}
            sx={{
              width: 64,
              height: 64,
              zIndex: 11,
              left: 10,
              right: 0,
              mx: 'auto',
              mt: 1
            }}
          />

        </Box>

        <Stack sx={{justifyContent: "flex-end", alignItems: "center"}}>
          <IconButton color={popover.open ? 'primary' : 'default'} onClick={popover.onOpen}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </Stack>

      </Stack>



      <ListItemText
        sx={{ mt: 3, mb: 1 }}
        primary={role}
        secondary={education}
        primaryTypographyProps={{ typography: 'subtitle1' }}
        secondaryTypographyProps={{ component: 'span', mt: 0.5, ml: 1.3, textAlign: 'left' }}
      />

      <Divider sx={{ borderStyle: 'dashed' }} />

      {goal !== '' &&
       <>
         <ListItemText
           sx={{mt: 3, mb: 1}}
           primary={'Goal'}
           secondary={goal}
           primaryTypographyProps={{typography: 'subtitle1'}}
           secondaryTypographyProps={{component: 'span', mt: 0.5, ml: 1.3, textAlign: 'left'}}
         />

         <Divider sx={{borderStyle: 'dashed'}}/>
       </>
      }

      {problem !== '' &&
       <>
         <ListItemText
           sx={{mt: 3, mb: 1}}
           primary={'Problem'}
           secondary={problem}
           primaryTypographyProps={{typography: 'subtitle1'}}
           secondaryTypographyProps={{component: 'span', mt: 0.5, ml: 1.3, textAlign: 'left'}}
         />
          <Divider sx={{borderStyle: 'dashed'}} />
         </>
      }

      {interests !== '' &&
       <>
         <ListItemText
           sx={{mt: 3, mb: 1}}
           primary={'Interests'}
           secondary={interests}
           primaryTypographyProps={{typography: 'subtitle1'}}
           secondaryTypographyProps={{component: 'span', mt: 0.5, ml: 1.3, textAlign: 'left'}}
         />

         <Divider sx={{borderStyle: 'dashed'}}/>
       </>
      }

      {bahavioral !== '' &&
       <>
         <ListItemText
           sx={{mt: 3, mb: 1}}
           primary={'Behavioral'}
           secondary={bahavioral}
           primaryTypographyProps={{typography: 'subtitle1'}}
           secondaryTypographyProps={{component: 'span', mt: 0.5, ml: 1.3, textAlign: 'left'}}
         />

         <Divider sx={{borderStyle: 'dashed'}}/>
       </>
      }

      {life_style !== '' &&
       <>
         <ListItemText
           sx={{mt: 3, mb: 1}}
           primary={'Life Style'}
           secondary={life_style}
           primaryTypographyProps={{typography: 'subtitle1'}}
           secondaryTypographyProps={{component: 'span', mt: 0.5, ml: 1.3, textAlign: 'left'}}
         />

         <Divider sx={{borderStyle: 'dashed'}}/>
       </>
      }

      <Box
        display="grid"
        gridTemplateColumns="repeat(3, 1fr)"
        sx={{ py: 3, typography: 'subtitle1' }}
      >
        <div>
          <Typography variant="caption" component="div" sx={{ mb: 0.5, color: 'text.secondary' }}>
            Age
          </Typography>
          {fShortenNumber(age)}
        </div>

        <div>
          <Typography variant="caption" component="div" sx={{ mb: 0.5, color: 'text.secondary' }}>
            Location
          </Typography>
          {location}
        </div>

        <div>
          <Typography variant="caption" component="div" sx={{ mb: 0.5, color: 'text.secondary' }}>
            Gender
          </Typography>
          {gender}
        </div>
      </Box>



      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 140 }}
      >
        <MenuItem
          onClick={() => {
            onEditRow();
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

      </CustomPopover>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete"
        content="Are you sure want to delete?"
        action={
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            Delete
          </Button>
        }
      />

    </Card>
  );
}

