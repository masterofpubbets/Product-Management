import {useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';

export default function ChangeUserRole({show, handleSubmit}) {
  const [open, setOpen] = useState(show);
  const [userRole, setUserRole] = useState('member')

  const handleClose = () => {
    setOpen(false);
    handleSubmit(null)
  };

  useEffect(() => {
    setOpen(show)
  }, [show])

  const handleClickSubmit = (event) => {
    event.preventDefault();
    handleClose();
    handleSubmit(userRole)
  };

  const handleRoleChange = (event) => {
    setUserRole(event.target.value)
  }

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Change User Role</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{marginBottom: '20px'}}>
            Change user's role for the current product.
          </DialogContentText>
          <form onSubmit={handleClickSubmit} id="subscription-form">
            <Box sx={{ width: '96%' }}>
              <FormControl sx={{ m: 1, minWidth: 120, width: '100%' }}>
                <InputLabel id="demo-simple-select-helper-label">Role</InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={userRole}
                  label="Role"
                  onChange={handleRoleChange}
                >
                  <MenuItem value={'admin'}>admin</MenuItem>
                  <MenuItem value={'member'}>member</MenuItem>
                  <MenuItem value={'guest'}>guest</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" form="subscription-form">
            Change
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
