import PropTypes from 'prop-types';
// @mui
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

// ----------------------------------------------------------------------

export default function ConfirmDialog({ title, content, open, onCancel, OnConfirm}) {
  return (
    <Dialog fullWidth maxWidth="xs" open={open} onClose={onCancel} >
      <DialogTitle sx={{ pb: 2 }}>{title}</DialogTitle>

      <DialogContent sx={{ typography: 'body2' }}> {content} </DialogContent>

      <DialogActions>
        <Button variant="outlined" color="inherit" onClick={OnConfirm}>
          Yes
        </Button>

        <Button variant="outlined" color="inherit" onClick={onCancel}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
