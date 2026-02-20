import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";


export default function AddUserSkills({ show, handlesubmit }) {
    const [open, setOpen] = useState(show);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const skill = formJson.skill;
    handlesubmit({ skill});
    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
    handlesubmit();
  };

  useEffect(() => {
    if (show) {
      setOpen(show);
    }
  }, [show]);

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Skill</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit} id="subscription-form">
            <TextField
              autoFocus
              required
              margin="dense"
              id="skill"
              name="skill"
              label="Skill"
              type="text"
              fullWidth
              variant="standard"
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" form="subscription-form">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
